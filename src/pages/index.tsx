import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import { useState } from "react";
import { BettingCard } from "../components/BettingCard";
import { useReadContract } from "wagmi";
import Image, { StaticImageData } from "next/image";

import patriots from "@/src/public/assets/patriots.png";
import jaguars from "@/src/public/assets/jaguars.png";
import flow from "@/src/public/assets/flow.png";

import { BETTING_ABI } from "../constants/abis";
import { BETTING_CONTRACT_ADDRESS } from "../constants/addresses";

// Mantemos apenas os logos necessários
const teamLogos: Record<string, StaticImageData> = {
  Patriots: patriots,
  Jaguars: jaguars,
};

const Home: NextPage = () => {
  const { data } = useReadContract({
    address: BETTING_CONTRACT_ADDRESS,
    abi: BETTING_ABI,
    functionName: "viewVolume",
    args: [],
  });

  const tokenA = data?.[0] ? parseInt(data[0].toString()) : 0;
  const tokenB = data?.[1] ? parseInt(data[1].toString()) : 0;
  const total = tokenA + tokenB;
  const priceA = 100 * (tokenA / (tokenA + tokenB));
  const priceB = 100 * (tokenB / (tokenA + tokenB));

  // Mantemos apenas o jogo que tem dados da blockchain
  const nflGames = [
    {
      time: "6:30 AM",
      volume: `$${total}`,
      teams: [
        { name: "Patriots", record: "1-5", price: priceA },
        { name: "Jaguars", record: "1-5", price: priceB },
      ],
    },
  ];

  const [selectedGame, setSelectedGame] = useState<{
    game: string;
    team: string;
  } | null>(null);

  const selectTeam = (game: string, team: string) => {
    setSelectedGame({ game, team });
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "white",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            zIndex: 10,
          }}
        >
          <ConnectButton />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            whiteSpace: "nowrap",
            marginBottom: "20px",
          }}
        >
          <Image
            src={flow}
            alt="Flow logo"
            width={36}
            height={36}
            style={{
              marginRight: "10px",
            }}
          />
          <h1
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#333",
              margin: 0,
            }}
          >
            FlowBets
          </h1>
        </div>

        <div
          style={{
            backgroundColor: "#1c1e22",
            borderRadius: "10px",
            padding: "20px",
            width: "45%",
            margin: "0 auto",
            color: "white",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>NFL Games</h2>

          {nflGames.map((game, index) => (
            <div
              key={index}
              style={{
                marginBottom: "20px",
                borderBottom: "1px solid #374151",
                paddingBottom: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                  color: "#9ca3af",
                }}
              >
                <span>{game.time}</span>
                <span>{game.volume} Vol.</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {game.teams.map((team, teamIndex) => (
                  <button
                    key={teamIndex}
                    onClick={() => selectTeam(game.time, team.name)}
                    style={{
                      backgroundColor:
                        selectedGame?.game === game.time &&
                        selectedGame?.team === team.name
                          ? "#007aff"
                          : "#1e293b",
                      color: "white",
                      padding: "10px",
                      borderRadius: "5px",
                      border: "none",
                      width: "48%",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Image
                      src={teamLogos[team.name]}
                      alt={`${team.name} logo`}
                      style={{
                        width: "24px",
                        height: "24px",
                        marginRight: "10px",
                      }}
                    />
                    <span>
                      {team.name} ({team.record})
                    </span>
                    <span>{team.price.toFixed(2)}¢</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <BettingCard />
      </div>
    </>
  );
};

export default Home;
