import { Header, PageContent, Tabs } from "@/components/shared";
import { showCustomToast } from "@/components/shared/toast";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import type { FundWalletResponse } from "@/models/response/walletBillingResponse";
import {
  useFundWalletMutation,
  useGetMyBillsQuery,
  useGetMySpendQuery,
  useGetWalletBalanceQuery,
  useGetWalletTransactionsQuery,
  useGetBalanceVsSpendQuery,
  useGetCurrentExchangeRateQuery,
} from "@/service/walletBillingApi";
import { useCallback, useState } from "react";
import { BillsList } from "./components/bills-list";
import { FundWalletCard } from "./components/fund-wallet-card";
import { FundingTransferDetailsCard } from "./components/funding-transfer-details-card";
import { TransactionsList } from "./components/transactions-list";
import { WalletBalanceCard } from "./components/wallet-balance-card";
import { SpendReportCard } from "./components/spend-report-card";
import { Skeleton } from "@/components/ui/skeleton";

const TRANSACTION_LIMIT = 20;

const TAB = {
  overview: 1,
  fund: 2,
  activity: 3,
  bills: 4,
} as const;

const DEFAULT_USD_TO_NGN_RATE = 1600;

export const Billings = () => {
  const [activeTab, setActiveTab] = useState<number>(TAB.overview);
  const [amount, setAmount] = useState("1");
  const [fundingDetails, setFundingDetails] = useState<FundWalletResponse | null>(
    null
  );

  const { data: walletBalance, isLoading: isWalletBalanceLoading } =
    useGetWalletBalanceQuery();
  const { data: transactionsResponse, isLoading: isTransactionsLoading } =
    useGetWalletTransactionsQuery({ limit: TRANSACTION_LIMIT });
  const { data: balanceVsSpend, isLoading: isBalanceVsSpendLoading } =
    useGetBalanceVsSpendQuery();
  const { data: mySpend, isLoading: isMySpendLoading } = useGetMySpendQuery();
  const { data: exchangeRate, isLoading: isExchangeRateLoading } =
    useGetCurrentExchangeRateQuery();
  const { data: myBills, isLoading: isMyBillsLoading } = useGetMyBillsQuery({
    detailed: true,
    limit: 50,
  });

  const [fundWallet, { isLoading: isFundingWallet }] = useFundWalletMutation();

  const transactions = transactionsResponse?.data ?? [];
  const billCount = Array.isArray(myBills) ? myBills.length : 0;
  const usdToNgnRate = exchangeRate?.rate ?? DEFAULT_USD_TO_NGN_RATE;
  const dollarAmount = Number(amount);
  const nairaEquivalent =
    Number.isFinite(dollarAmount) && dollarAmount > 0
      ? dollarAmount * usdToNgnRate
      : 0;

  const spendOverview = mySpend
    ? {
        spend: Object.fromEntries(
          mySpend.spend.map((item) => [item.date, item.amount])
        ),
        grand_total: mySpend.total_spent,
        currency: mySpend.currency ?? "USD",
        total_accounts_with_spend: 0,
      }
    : undefined;

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
        <div className="space-y-4">
          <SpendReportCard
            isLoading={isMySpendLoading || isBalanceVsSpendLoading}
            data={spendOverview}
          />
          {balanceVsSpend ? (
            <p className="text-xs text-muted-foreground">
              Wallet balance: {balanceVsSpend.wallet_balance.toLocaleString()}{" "}
              {balanceVsSpend.currency ?? "NGN"} · Cloud spend (last{" "}
              {balanceVsSpend.period_days} days):{" "}
              {balanceVsSpend.cloud_spend_in_period.toLocaleString()}{" "}
              {balanceVsSpend.currency ?? "NGN"}
            </p>
          ) : isBalanceVsSpendLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-3 w-full max-w-xl" />
            </div>
          ) : null}
        </div>
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
            exchangeRate={usdToNgnRate}
            isLoading={isExchangeRateLoading}
            isFunding={isFundingWallet}
            onAmountChange={setAmount}
            onFund={handleFundWallet}
          />
          <FundingTransferDetailsCard details={fundingDetails} />
        </div>
      ),
    },
    {
      id: TAB.activity,
      text: "Activity",
      component: (
        <TransactionsList
          isLoading={isTransactionsLoading}
          transactions={transactions}
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
    <div className="min-h-screen">
      <Header
        title="Wallet & Billing"
        description="Balance, funding, transactions, and invoices in one place"
      />

      <PageContent className="w-full max-w-5xl">
        <WalletBalanceCard
          isLoading={isWalletBalanceLoading}
          balance={walletBalance?.balance}
          currency={walletBalance?.currency}
        />

        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      </PageContent>
    </div>
  );
};
