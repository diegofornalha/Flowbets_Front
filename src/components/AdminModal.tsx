import { useState } from "react";
import { Modal } from "./ui/modal";
import { Button } from "./ui/button";
import { useReadContract } from "wagmi";
import { BETTING_ABI } from "../constants/abis";
import { BETTING_CONTRACT_ADDRESS } from "../constants/addresses";

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Tab = "settings" | "history";

interface BetInfo {
  bettor: string;
  amount: bigint;
  timestamp: bigint;
  isPatriots: boolean;
}

export function AdminModal({ isOpen, onClose }: AdminModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>("settings");
  
  // Estados para as configurações
  const [minBet, setMinBet] = useState("0.1");
  const [maxBet, setMaxBet] = useState("100");
  const [feePercentage, setFeePercentage] = useState("2.5");
  const [isGamePaused, setIsGamePaused] = useState(false);
  const [payoutMultiplier, setPayoutMultiplier] = useState("2");

  // Função para salvar configurações
  const saveSettings = async () => {
    try {
      // Aqui implementaremos as chamadas ao contrato para atualizar as configurações
      console.log("Salvando configurações...");
    } catch (error) {
      console.error("Erro ao salvar configurações:", error);
    }
  };

  // Consulta o histórico de apostas
  const { data: bettingHistory } = useReadContract({
    address: BETTING_CONTRACT_ADDRESS,
    abi: BETTING_ABI,
    functionName: "getBettingHistory",
    args: [],
  });

  // Função para formatar o endereço da carteira
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Função para formatar o timestamp em formato tabela
  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) * 1000);
    const formattedDate = date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    const formattedTime = date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    return (
      <div className="flex flex-col">
        <span className="font-medium text-[#333]">{formattedDate}</span>
        <span className="text-[#666] text-sm">{formattedTime}</span>
      </div>
    );
  };

  // Função para formatar o valor em FLOW
  const formatAmount = (amount: bigint) => {
    return (Number(amount) / 1e18).toFixed(4);
  };

  // Dados mockados para o histórico
  const mockHistory = [
    {
      bettor: "0x1234...5789",
      amount: BigInt(5 * 1e18), // 5 FLOW
      timestamp: BigInt(Math.floor(Date.now() / 1000 - 3600)), // 1 hora atrás
      isPatriots: true,
    },
    {
      bettor: "0x1234...5789",
      amount: BigInt(2.5 * 1e18), // 2.5 FLOW
      timestamp: BigInt(Math.floor(Date.now() / 1000 - 7200)), // 2 horas atrás
      isPatriots: false,
    },
    {
      bettor: "0x1234...5789",
      amount: BigInt(10 * 1e18), // 10 FLOW
      timestamp: BigInt(Math.floor(Date.now() / 1000 - 86400)), // 1 dia atrás
      isPatriots: true,
    },
  ];

  // Usar os dados mockados se não houver dados reais
  const displayHistory = bettingHistory?.length ? bettingHistory : mockHistory;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Painel Administrativo">
      <div className="flex border-b border-[#ddd] mb-6">
        <Button
          onClick={() => setActiveTab("settings")}
          className={`px-6 py-3 ${
            activeTab === "settings"
              ? "text-[#007aff] border-b-2 border-[#007aff] bg-transparent"
              : "text-[#666] bg-transparent hover:text-[#333]"
          }`}
          variant="ghost"
        >
          Configurações
        </Button>
        <Button
          onClick={() => setActiveTab("history")}
          className={`px-6 py-3 ${
            activeTab === "history"
              ? "text-[#007aff] border-b-2 border-[#007aff] bg-transparent"
              : "text-[#666] bg-transparent hover:text-[#333]"
          }`}
          variant="ghost"
        >
          Histórico
        </Button>
      </div>

      <div className="max-w-[1200px] mx-auto">
        {activeTab === "settings" ? (
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-6">Configurações de Apostas</h3>
            <div className="space-y-6">
              {/* Limites de Apostas */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#333]">
                    Aposta Mínima (FLOW)
                  </label>
                  <input
                    type="number"
                    value={minBet}
                    onChange={(e) => setMinBet(e.target.value)}
                    className="w-full p-2 border rounded-lg bg-[#f5f5f5]"
                    step="0.1"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#333]">
                    Aposta Máxima (FLOW)
                  </label>
                  <input
                    type="number"
                    value={maxBet}
                    onChange={(e) => setMaxBet(e.target.value)}
                    className="w-full p-2 border rounded-lg bg-[#f5f5f5]"
                    step="1"
                  />
                </div>
              </div>

              {/* Taxa e Multiplicador */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#333]">
                    Taxa do Sistema (%)
                  </label>
                  <input
                    type="number"
                    value={feePercentage}
                    onChange={(e) => setFeePercentage(e.target.value)}
                    className="w-full p-2 border rounded-lg bg-[#f5f5f5]"
                    step="0.1"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#333]">
                    Multiplicador de Pagamento
                  </label>
                  <input
                    type="number"
                    value={payoutMultiplier}
                    onChange={(e) => setPayoutMultiplier(e.target.value)}
                    className="w-full p-2 border rounded-lg bg-[#f5f5f5]"
                    step="0.1"
                  />
                </div>
              </div>

              {/* Controles do Jogo */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#f5f5f5] rounded-lg">
                  <div>
                    <h4 className="font-medium text-[#333]">Status do Jogo</h4>
                    <p className="text-sm text-[#666]">
                      {isGamePaused ? "Apostas Pausadas" : "Apostas Ativas"}
                    </p>
                  </div>
                  <Button
                    onClick={() => setIsGamePaused(!isGamePaused)}
                    className={`${
                      isGamePaused
                        ? "bg-[#dc2626] hover:bg-[#b91c1c]"
                        : "bg-[#10b981] hover:bg-[#0d9668]"
                    } text-white`}
                  >
                    {isGamePaused ? "Retomar Apostas" : "Pausar Apostas"}
                  </Button>
                </div>
              </div>

              {/* Botão Salvar */}
              <Button
                onClick={saveSettings}
                className="w-full bg-[#007aff] hover:bg-[#0056b3] text-white mt-6"
              >
                Salvar Configurações
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Histórico de Apostas</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#eee]">
                    <th className="text-left p-3">Data</th>
                    <th className="text-left p-3">Apostador</th>
                    <th className="text-left p-3">Time</th>
                    <th className="text-right p-3">Valor (FLOW)</th>
                  </tr>
                </thead>
                <tbody>
                  {displayHistory.map((bet, index) => (
                    <tr 
                      key={index} 
                      className={`border-b border-[#eee] ${
                        index % 2 === 0 ? 'bg-white' : 'bg-[#f9f9f9]'
                      } hover:bg-[#f0f0f0] transition-colors duration-150`}
                    >
                      <td className="p-3">{formatDate(bet.timestamp)}</td>
                      <td className="p-3">{bet.bettor}</td>
                      <td className="p-3">{bet.isPatriots ? "Patriots" : "Jaguars"}</td>
                      <td className="p-3 text-right">{formatAmount(bet.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-4 p-4 bg-[#f5f5f5] rounded-lg">
                <div className="flex justify-between text-sm text-[#666]">
                  <div>
                    <p>Total de apostas: {displayHistory.length}</p>
                    <p>Apostador mais ativo: 0x1234...5789</p>
                  </div>
                  <div className="text-right">
                    <p>Volume total: {displayHistory.reduce((acc, bet) => acc + Number(formatAmount(bet.amount)), 0).toFixed(2)} FLOW</p>
                    <p>Última aposta: {formatDate(displayHistory[0]?.timestamp || BigInt(0))}</p>
                  </div>
                </div>
              </div>
              
              {displayHistory.length === 0 && (
                <div className="text-center py-8 text-[#666]">
                  Nenhuma aposta registrada ainda.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
} 