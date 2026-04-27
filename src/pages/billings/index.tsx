import { Header } from "@/components/shared";
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
import { useState } from "react";
import { BillsList } from "./components/bills-list";
import { FundWalletCard } from "./components/fund-wallet-card";
import { FundingTransferDetailsCard } from "./components/funding-transfer-details-card";
import { FundingStatusCard } from "./components/funding-status-card";
import { SpendReportCard } from "./components/spend-report-card";
import { TransactionsList } from "./components/transactions-list";
import { WalletBalanceCard } from "./components/wallet-balance-card";

const TRANSACTION_LIMIT = 20;

export const Billings = () => {
  const [amount, setAmount] = useState("1000");
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

  const handleFundWallet = async () => {
    try {
      const response = await fundWallet({ amount }).unwrap();
      setFundingDetails(response);
      setPaymentId(response.payment_id);
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
  };

  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-32 size-[28rem] rounded-full bg-primary/15 blur-[120px]" />
        <div className="absolute top-1/3 -right-40 size-[32rem] rounded-full bg-blue-400/20 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 size-[24rem] rounded-full bg-emerald-400/15 blur-[120px]" />
      </div>

      <Header
        title="Wallet & Billing"
        description="Manage your wallet balance, fund your account, and review spend"
      />

      <div className="px-5 pb-10 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <WalletBalanceCard
            isLoading={isWalletBalanceLoading}
            balance={walletBalance?.balance}
            currency={walletBalance?.currency}
          />
          <FundWalletCard
            amount={amount}
            isFunding={isFundingWallet}
            onAmountChange={setAmount}
            onFund={handleFundWallet}
          />
        </div>

        <FundingStatusCard
          isUninitialized={isFundingStatusUninitialized}
          isLoading={isFundingStatusLoading}
          data={fundingStatus}
          onRefresh={refetchFundingStatus}
        />
        <FundingTransferDetailsCard details={fundingDetails} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <TransactionsList
              isLoading={isTransactionsLoading}
              transactions={transactions ?? []}
            />
          </div>
          <div className="space-y-4">
            <SpendReportCard
              isLoading={isSpendReportLoading}
              data={spendReport}
            />
            <BillsList isLoading={isMyBillsLoading} data={myBills} />
          </div>
        </div>
      </div>
    </div>
  );
};
