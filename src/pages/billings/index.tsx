import { Header, Tabs } from "@/components/shared";
import { showCustomToast } from "@/components/shared/toast";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import type { FundWalletResponse } from "@/models/response/walletBillingResponse";
import {
  useCheckWalletFundingStatusQuery,
  useFundWalletMutation,
  useGetMyBillsQuery,
  useGetSpendReportQuery,
  useGetWalletBalanceQuery,
  useGetWalletTransactionsQuery,
} from "@/service/python/walletBillingApi";
import { useCallback, useState } from "react";
import { BillsList } from "./components/bills-list";
import { FundWalletCard } from "./components/fund-wallet-card";
import { FundingTransferDetailsCard } from "./components/funding-transfer-details-card";
import { FundingStatusCard } from "./components/funding-status-card";
import { SpendReportCard } from "./components/spend-report-card";
import { TransactionsList } from "./components/transactions-list";
import { WalletBalanceCard } from "./components/wallet-balance-card";

const TRANSACTION_LIMIT = 20;

const TAB = {
  overview: 1,
  fund: 2,
  activity: 3,
  bills: 4,
} as const;

const DEFAULT_USD_TO_NGN_RATE = 1600;
const USD_TO_NGN_RATE =
  Number(import.meta.env.VITE_USD_TO_NGN_RATE) || DEFAULT_USD_TO_NGN_RATE;

export const Billings = () => {
  const [activeTab, setActiveTab] = useState<number>(TAB.overview);
  const [amount, setAmount] = useState("350");
  const [paymentId, setPaymentId] = useState("");
  const [fundingDetails, setFundingDetails] = useState<FundWalletResponse | null>(
    null
  );

  const { data: walletBalance, isLoading: isWalletBalanceLoading } =
    useGetWalletBalanceQuery();
  const { data: transactions, isLoading: isTransactionsLoading } =
    useGetWalletTransactionsQuery({ limit: TRANSACTION_LIMIT });
  const { data: spendReport, isLoading: isSpendReportLoading } =
    useGetSpendReportQuery();
  const { data: myBills, isLoading: isMyBillsLoading } = useGetMyBillsQuery();
  const {
    data: fundingStatus,
    isFetching: isFundingStatusLoading,
    isUninitialized: isFundingStatusUninitialized,
    refetch: refetchFundingStatus,
  } = useCheckWalletFundingStatusQuery(paymentId, { skip: !paymentId });

  const [fundWallet, { isLoading: isFundingWallet }] = useFundWalletMutation();

  const billCount = myBills?.bills?.length ?? 0;
  const dollarAmount = Number(amount);
  const nairaEquivalent =
    Number.isFinite(dollarAmount) && dollarAmount > 0
      ? dollarAmount * USD_TO_NGN_RATE
      : 0;

  const handleFundWallet = useCallback(async () => {
    if (!nairaEquivalent) {
      showCustomToast("Enter a valid dollar amount to fund your wallet", {
        toastOptions: { type: "error", autoClose: 4000 },
      });
      return;
    }

    try {
      const response = await fundWallet({ amount: nairaEquivalent }).unwrap();
      setFundingDetails(response);
      setPaymentId(response.payment_id);
      setActiveTab(TAB.fund);
      showCustomToast("Funding account generated successfully", {
        toastOptions: { type: "success", autoClose: 4000 },
      });
    } catch (error) {
      showCustomToast(
        ErrorHandler.extractMessage(error) ||
          "Unable to generate funding account",
        { toastOptions: { type: "error", autoClose: 4000 } }
      );
    }
  }, [fundWallet, nairaEquivalent]);

  const tabs = [
    {
      id: TAB.overview,
      text: "Overview",
      component: (
        <SpendReportCard isLoading={isSpendReportLoading} data={spendReport} />
      ),
    },
    {
      id: TAB.fund,
      text: "Fund wallet",
      component: (
        <div className="max-w-2xl space-y-4">
          <FundWalletCard
            amount={amount}
            equivalentAmount={nairaEquivalent}
            exchangeRate={USD_TO_NGN_RATE}
            isFunding={isFundingWallet}
            onAmountChange={setAmount}
            onFund={handleFundWallet}
          />
          <FundingTransferDetailsCard details={fundingDetails} />
          <FundingStatusCard
            isUninitialized={isFundingStatusUninitialized}
            isLoading={isFundingStatusLoading}
            data={fundingStatus}
            onRefresh={refetchFundingStatus}
          />
        </div>
      ),
    },
    {
      id: TAB.activity,
      text: "Activity",
      component: (
        <TransactionsList
          isLoading={isTransactionsLoading}
          transactions={transactions ?? []}
        />
      ),
    },
    {
      id: TAB.bills,
      text: billCount > 0 ? `Bills (${billCount})` : "Bills",
      component: <BillsList isLoading={isMyBillsLoading} data={myBills} />,
    },
  ];

  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-32 size-[28rem] rounded-full bg-primary/15 blur-[120px]" />
        <div className="absolute top-1/3 -right-40 size-[32rem] rounded-full bg-blue-400/20 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 size-[24rem] rounded-full bg-emerald-400/15 blur-[120px]" />
      </div>

      <Header
        title="Wallet & Billing"
        description="Balance, funding, transactions, and invoices in one place"
      />

      <div className="px-5 pb-10 space-y-5">
        <WalletBalanceCard
          isLoading={isWalletBalanceLoading}
          balance={walletBalance?.balance}
          currency={walletBalance?.currency}
        />

        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
};
