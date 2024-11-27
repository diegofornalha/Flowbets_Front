import { useState } from "react";
import { Modal } from "./ui/modal";
import { Button } from "./ui/button";

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Tab = "settings" | "history";

export function AdminModal({ isOpen, onClose }: AdminModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>("settings");

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
            <h3 className="text-lg font-semibold mb-4">Configurações de Apostas</h3>
            {/* Conteúdo da aba de configurações */}
            <div className="space-y-4">
              <div className="p-4 bg-[#f5f5f5] rounded-lg">
                <p className="text-[#666]">Configurações das apostas aqui...</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Histórico de Apostas</h3>
            {/* Conteúdo da aba de histórico */}
            <div className="space-y-4">
              <div className="p-4 bg-[#f5f5f5] rounded-lg">
                <p className="text-[#666]">Histórico das apostas aqui...</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
} 