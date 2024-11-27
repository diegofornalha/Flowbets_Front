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
  status: number; // 0: Em andamento, 1: Ganhou, 2: Perdeu, 3: CASA
}

export function AdminModal({ isOpen, onClose }: AdminModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>("settings");
  
  // Leitura da taxa do sistema
  const { data: feeData } = useReadContract({
    address: BETTING_CONTRACT_ADDRESS,
    abi: BETTING_ABI,
    functionName: "getFeePercentage",
  });

  // Leitura do volume total
  const { data: volumeData } = useReadContract({
    address: BETTING_CONTRACT_ADDRESS,
    abi: BETTING_ABI,
    functionName: "viewVolume",
    args: [],
  });

  // Leitura do histórico
  const { data: bettingHistory } = useReadContract({
    address: BETTING_CONTRACT_ADDRESS,
    abi: BETTING_ABI,
    functionName: "getBettingHistory",
    args: [],
  });

  // Leitura dos valores
  const { data: distributionData } = useReadContract({
    address: BETTING_CONTRACT_ADDRESS,
    abi: BETTING_ABI,
    functionName: "getDistributionValues",
    args: [],
  });

  // Cálculo das porcentagens
  const totalValue = distributionData ? 
    Number(distributionData[0]) + Number(distributionData[1]) : 0;

  const ganhadores = {
    valor: distributionData ? Number(distributionData[0]) / 1e18 : 0,
    percentual: totalValue > 0 ? 
      (Number(distributionData?.[0]) / totalValue * 100).toFixed(2) : "0"
  };

  const casa = {
    valor: distributionData ? Number(distributionData[1]) / 1e18 : 0,
    percentual: totalValue > 0 ? 
      (Number(distributionData?.[1]) / totalValue * 100).toFixed(2) : "0"
  };

  // Calcula o volume total
  const totalVolume = volumeData ? 
    Number(volumeData[0]) + Number(volumeData[1]) : 0;

  // Funções de formatação
  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) * 1000);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const formatAmount = (amount: bigint) => {
    return (Number(amount) / 1e18).toFixed(4);
  };

  // Histórico para exibição
  const displayHistory = bettingHistory || [];

  const getStatusText = (status: number) => {
    switch (status) {
      case 0: return 'Em andamento';
      case 1: return 'Ganhou';
      case 2: return 'Perdeu';
      case 3: return 'CASA';
      default: return 'Desconhecido';
    }
  };

  const getStatusColor = (status: number) => {
    switch (status) {
      case 0: return 'text-yellow-500';  // Em andamento
      case 1: return 'text-green-500';   // Ganhou
      case 2: return 'text-red-500';     // Perdeu
      case 3: return 'text-purple-500';  // CASA
      default: return 'text-gray-500';
    }
  };

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
            <h3 className="text-lg font-semibold mb-6">% de ganhos sobre as negociações</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-[#f5f5f5] rounded-lg">
                <div className="text-lg font-semibold text-[#333]">
                  {feeData ? Number(feeData) / 100 : 0}%
                </div>
              </div>
              <div className="p-4 bg-[#f5f5f5] rounded-lg">
                <div className="text-lg font-semibold text-[#333]">
                  {((totalVolume * (feeData ? Number(feeData) / 10000 : 0)) / 1e18).toFixed(4)}
                </div>
              </div>
            </div>

            {/* Informações de Ganhadores e Casa */}
            <div className="space-y-4">
              <div className="p-4 bg-[#f5f5f5] rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#666]">Ganhadores</span>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-[#333]">{ganhadores.percentual}%</div>
                    <div className="text-sm text-[#666]">{ganhadores.valor.toFixed(4)}</div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#f5f5f5] rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#666]">Casa</span>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-[#333]">{casa.percentual}%</div>
                    <div className="text-sm text-[#666]">{casa.valor.toFixed(4)}</div>
                  </div>
                </div>
              </div>
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
                    <th className="text-right p-3">Valor</th>
                    <th className="text-center p-3">Status</th>
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
                      <td className={`p-3 text-center ${getStatusColor(bet.status)}`}>
                        {getStatusText(bet.status)}
                      </td>
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