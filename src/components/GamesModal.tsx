import { useState } from "react";
import { useReadContract, useWriteContract } from "wagmi";
import Image, { StaticImageData } from "next/image";
import { Modal } from "./ui/modal";
import { BETTING_ABI } from "../constants/abis";
import { BETTING_CONTRACT_ADDRESS } from "../constants/addresses";
import patriots from "@/src/public/assets/patriots.png";
import jaguars from "@/src/public/assets/jaguars.png";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

const formSchema = z.object({
  amount: z.string().min(1).max(200),
});

const teamLogos: Record<string, StaticImageData> = {
  Patriots: patriots,
  Jaguars: jaguars,
};

interface GamesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Tab = "games" | "outcome";

export function GamesModal({ isOpen, onClose }: GamesModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>("games");
  const { data } = useReadContract({
    address: BETTING_CONTRACT_ADDRESS,
    abi: BETTING_ABI,
    functionName: "viewVolume",
    args: [],
  });

  const { writeContract } = useWriteContract();
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
    },
  });

  const tokenA = data?.[0] ? parseInt(data[0].toString()) : 0;
  const tokenB = data?.[1] ? parseInt(data[1].toString()) : 0;
  const total = tokenA + tokenB;
  const priceA = 100 * (tokenA / (tokenA + tokenB));
  const priceB = 100 * (tokenB / (tokenA + tokenB));

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

  const [isSuccess, setIsSuccess] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'error' | 'warning' | null;
    message: string;
  }>({ type: null, message: '' });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (!selectedTeam) {
        setNotification({
          type: 'warning',
          message: 'Por favor, selecione um time primeiro'
        });
        setActiveTab("games");
        setTimeout(() => setNotification({ type: null, message: '' }), 3000);
        return;
      }

      const amountInWei = BigInt(parseFloat(values.amount) * 1e18);

      await writeContract({
        address: BETTING_CONTRACT_ADDRESS,
        abi: BETTING_ABI,
        functionName: selectedTeam === "Patriots" ? "placeBets" : "placeBetsJag",
        args: [amountInWei],
        value: amountInWei
      });

      setIsSuccess(true);
      form.reset();
      setSelectedTeam(null);
      
      setTimeout(() => {
        setIsSuccess(false);
        setActiveTab("games");
      }, 2000);

    } catch (error) {
      console.error("Erro na transação:", error);
      setNotification({
        type: 'error',
        message: 'Erro ao processar a transação. Tente novamente.'
      });
      setTimeout(() => setNotification({ type: null, message: '' }), 3000);
    }
  }

  const selectTeam = (game: string, team: string) => {
    setSelectedTeam(team);
    setActiveTab("outcome");
  };

  const formatAmount = (amount: string) => {
    const value = parseFloat(amount || "0");
    return value.toFixed(4);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="NFL Betting">
      {/* Notification Banner */}
      {notification.type && (
        <div
          className={`
            fixed top-4 left-1/2 transform -translate-x-1/2 z-50
            px-6 py-3 rounded-lg shadow-lg
            transition-all duration-300 ease-in-out
            ${notification.type === 'error' ? 'bg-red-500' : 'bg-yellow-500'} 
            text-white font-medium
          `}
          style={{
            animation: 'slideDown 0.3s ease-out'
          }}
        >
          {notification.message}
        </div>
      )}

      <div className="flex border-b border-[#ddd] mb-6">
        <Button
          onClick={() => setActiveTab("games")}
          className={`px-6 py-3 ${
            activeTab === "games"
              ? "text-[#007aff] border-b-2 border-[#007aff] bg-transparent"
              : "text-[#666] bg-transparent hover:text-[#333]"
          }`}
          variant="ghost"
        >
          ⚽ NFL Games
        </Button>
        <Button
          onClick={() => setActiveTab("outcome")}
          className={`px-6 py-3 ${
            activeTab === "outcome"
              ? "text-[#007aff] border-b-2 border-[#007aff] bg-transparent"
              : "text-[#666] bg-transparent hover:text-[#333]"
          }`}
          variant="ghost"
        >
          Resultado
        </Button>
      </div>

      <div className="max-w-[1200px] mx-auto">
        {activeTab === "games" ? (
          <div className="bg-white rounded-lg p-6">
            <div className="space-y-4">
              {nflGames.map((game, index) => (
                <div
                  key={index}
                  className="border-b border-[#eee] pb-4 last:border-0"
                >
                  <div className="flex justify-between text-[#666] mb-3">
                    <span>{game.time}</span>
                    <span>{game.volume} Vol.</span>
                  </div>

                  <div className="flex gap-4">
                    {game.teams.map((team, teamIndex) => (
                      <button
                        key={teamIndex}
                        onClick={() => selectTeam(game.time, team.name)}
                        className={`flex-1 flex items-center justify-between p-3 rounded-lg border ${
                          selectedTeam === team.name
                            ? "bg-[#007aff] text-white border-[#007aff]"
                            : "bg-[#f5f5f5] text-[#333] border-[#ddd] hover:bg-[#e8e8e8]"
                        }`}
                      >
                        <div className="flex items-center">
                          <Image
                            src={teamLogos[team.name]}
                            alt={`${team.name} logo`}
                            width={24}
                            height={24}
                            className="mr-3"
                          />
                          <span>
                            {team.name} ({team.record})
                          </span>
                        </div>
                        <span>{team.price.toFixed(2)}¢</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-[500px] mx-auto p-6">
            <div className="space-y-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#333] text-sm font-medium">Amount (FLOW)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.0001"
                            placeholder="0.0000"
                            {...field}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (!isNaN(parseFloat(value)) || value === '') {
                                field.onChange(value);
                              }
                            }}
                            className="bg-[#f5f5f5] border-[#ddd] text-[#333] h-12"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>

              <div className="space-y-3 bg-[#f5f5f5] p-4 rounded-lg border border-[#ddd]">
                <div className="flex justify-between text-[#666]">
                  <span>Amount in FLOW:</span>
                  <span>{formatAmount(form.watch("amount") || "0")} FLOW</span>
                </div>
                <div className="flex justify-between text-[#666]">
                  <span>Avg Price:</span>
                  <span>{selectedTeam === "Patriots" ? `${priceA}¢` : `${priceB}¢`}</span>
                </div>
                <div className="flex justify-between text-[#666]">
                  <span>Shares:</span>
                  <span>{((Number(form.watch("amount") || 0) * 100) / priceA).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#666]">
                  <span>Potential return:</span>
                  <span>
                    {((Number(form.watch("amount") || 0) * 100) / priceA).toFixed(2)} FLOW
                    {" ("}
                    {(((Number(form.watch("amount")) / priceA) * 100 -
                      Number(form.watch("amount"))) /
                      Number(form.watch("amount"))) *
                      100}
                    {"%) "}
                  </span>
                </div>
              </div>

              <Button
                type="submit"
                onClick={form.handleSubmit(onSubmit)}
                className={`w-full h-12 text-lg font-medium transition-all duration-300 ${
                  isSuccess 
                    ? "bg-green-500 hover:bg-green-600" 
                    : "bg-[#10b981] hover:bg-[#0d9668]"
                } text-white`}
                disabled={!form.watch("amount") || parseFloat(form.watch("amount")) <= 0}
              >
                {isSuccess ? "Aposta Confirmada! ✓" : "Place Bet"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
} 