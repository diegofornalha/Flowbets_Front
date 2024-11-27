import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import { useState } from "react";
import Image from "next/image";
import { Button } from "../components/ui/button";
import flow from "@/src/public/assets/flow.png";
import { GamesModal } from "../components/GamesModal";
import { AdminModal } from "../components/AdminModal";

const Home: NextPage = () => {
  const [showCategories, setShowCategories] = useState(false);
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  return (
    <>
      <div
        style={{
          backgroundColor: "#f0f2f5",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          position: "relative",
        }}
      >
        {/* Header */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            zIndex: 10,
          }}
        >
          <ConnectButton />
          
          {/* Container para Botões */}
          <div 
            style={{
              marginTop: "10px",
              position: "relative",
              display: "flex",
              gap: "10px"
            }}
          >
            {/* Botão Categorias */}
            <div style={{ position: "relative", flex: 1 }}>
              <Button
                onClick={() => {
                  setShowCategories(!showCategories);
                  setShowAdminMenu(false);
                }}
                className={`
                  bg-[#ffffff] 
                  text-[#333] 
                  border-2
                  border-[#ffffff] 
                  w-full 
                  transition-all 
                  duration-200 
                  hover:scale-[1.02] 
                  hover:bg-[#ffffff]
                  rounded-2xl
                  shadow-sm
                  font-bold
                  ${showCategories ? 'scale-[0.98]' : 'scale-100'}
                `}
              >
                Categorias
              </Button>
              
              {showCategories && (
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    marginTop: "5px",
                    backgroundColor: "#ffffff",
                    borderRadius: "16px",
                    padding: "8px",
                    width: "100%",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    border: "2px solid #ffffff"
                  }}
                >
                  <Button
                    className="w-full text-left bg-transparent hover:bg-[#f5f5f5] justify-start text-[#333] rounded-xl font-bold"
                    variant="ghost"
                    onClick={() => {
                      setIsModalOpen(true);
                      setShowCategories(false);
                    }}
                  >
                    ⚽️ Time A vs Time B
                  </Button>
                </div>
              )}
            </div>

            {/* Botão Painel Admin com Submenu */}
            <div style={{ position: "relative" }}>
              <Button
                className={`
                  bg-[#ffffff] 
                  text-[#333] 
                  border-2
                  border-[#ffffff] 
                  transition-all 
                  duration-200 
                  hover:scale-[1.02] 
                  hover:bg-[#ffffff]
                  rounded-2xl
                  shadow-sm
                  font-bold
                  px-4
                  ${showAdminMenu ? 'scale-[0.98]' : 'scale-100'}
                `}
                onClick={() => {
                  setShowAdminMenu(!showAdminMenu);
                  setShowCategories(false);
                }}
              >
                Painel Admin
              </Button>

              {showAdminMenu && (
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    marginTop: "5px",
                    backgroundColor: "#ffffff",
                    borderRadius: "16px",
                    padding: "8px",
                    width: "100%",
                    minWidth: "150px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    border: "2px solid #ffffff"
                  }}
                >
                  <Button
                    className="w-full text-left bg-transparent hover:bg-[#f5f5f5] justify-start text-[#333] rounded-xl font-bold"
                    variant="ghost"
                    onClick={() => {
                      setIsAdminModalOpen(true);
                      setShowAdminMenu(false);
                    }}
                  >
                    🎲 placeBets
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="max-w-6xl mx-auto mt-20 text-center">
          <div className="flex justify-center mb-8">
            <Image
              src={flow}
              alt="Flow logo"
              width={80}
              height={80}
            />
          </div>
          
          <h1 className="text-5xl font-bold mb-6 text-[#333]">
            FlowBets
          </h1>
          
          <p className="text-xl text-[#666] mb-8 max-w-2xl mx-auto">
            Apostas esportivas descentralizadas na blockchain Flow. 
            Transparente, seguro e sem intermediários.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-[#ddd]">
              <h3 className="text-xl font-semibold mb-3 text-[#333]">Transparente</h3>
              <p className="text-[#666]">Todas as apostas e odds são registradas na blockchain, garantindo total transparência.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-[#ddd]">
              <h3 className="text-xl font-semibold mb-3 text-[#333]">Sem Intermediários</h3>
              <p className="text-[#666]">Apostas peer-to-peer sem custos de intermediação.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-[#ddd]">
              <h3 className="text-xl font-semibold mb-3 text-[#333]">Pagamento Instantâneo</h3>
              <p className="text-[#666]">Receba seus ganhos automaticamente através de smart contracts.</p>
            </div>
          </div>

          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#007aff] text-white hover:bg-[#0056b3] text-lg px-8 py-3"
          >
            Começar a Apostar
          </Button>
        </div>

        {/* Games Modal */}
        <GamesModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        
        {/* Admin Modal */}
        <AdminModal isOpen={isAdminModalOpen} onClose={() => setIsAdminModalOpen(false)} />
      </div>
    </>
  );
};

export default Home;
