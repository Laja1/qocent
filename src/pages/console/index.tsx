import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  IconArrowRight,
  IconBolt,
  IconChartBar,
  IconCloud,
  IconLock,
  IconLogout,
  IconShieldCheck,
} from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "@/store";
import { dashboardStore } from "@/store/dashboardSlice";
import { authStore } from "@/store/authSlice";
import { useOrganizationStore } from "@/store/organizationStore";
import { RouteConstant } from "@/router/routes";
import { Button } from "@/components/ui/button";
import { imgLinks } from "@/assets/assetLink";

export const Console = () => {
  type CloudProvider = "aws" | "huawei" | "azure" | "gcp";

  const user = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { clearOrganization } = useOrganizationStore();
  const activeProvider = useSelector((state: RootState) => state.dashboard.provider);
  const [selectedProvider, setSelectedProvider] = useState<CloudProvider>(
    (activeProvider as CloudProvider) || "huawei"
  );

  const workspaceConfigs = {
    aws: {
      name: "Amazon Web Services",
      subtitle: "Production workloads and shared services",
      logo: imgLinks.awsdark,
      gradient: "linear-gradient(135deg, #FF9900 0%, #232F3E 100%)",
      available: true,
    },
    huawei: {
      name: "Huawei Cloud",
      subtitle: "Core infra and regional edge deployments",
      logo: imgLinks.huawei,
      gradient: "linear-gradient(135deg, #C12C27 0%, #7A0810 100%)",
      available: true,
    },
    gcp: {
      name: "Google Cloud",
      subtitle: "Analytics workloads and data platform",
      logo: imgLinks.gcp,
      gradient: "linear-gradient(135deg, #1A73E8 0%, #34A853 100%)",
      available: false,
    },
    azure: {
      name: "Microsoft Azure",
      subtitle: "Enterprise identity and hybrid workloads",
      logo: imgLinks.azure,
      gradient: "linear-gradient(135deg, #0078D4 0%, #004578 100%)",
      available: false,
    },
  } as const;

  const selectedConfig = workspaceConfigs[selectedProvider];

  const initials = `${user?.userFirstName?.[0] ?? ""}${
    user?.userLastName?.[0] ?? ""
  }`.toUpperCase();

  const features = useMemo(
    () => [
      { icon: IconChartBar, text: "Unified cost visibility across cloud providers" },
      { icon: IconBolt, text: "Fast workspace switching with persisted provider context" },
      { icon: IconShieldCheck, text: "Secure access control and audit-ready actions" },
    ],
    []
  );

  const handleContinue = () => {
    if (!selectedConfig.available) return;
    dispatch(dashboardStore.action.setProvider(selectedProvider));
    navigate(RouteConstant.dashboard.serverSite.path);
  };

  const handleLogout = () => {
    dispatch(authStore.action.logout());
    clearOrganization();
    navigate(RouteConstant.auth.signin.path);
  };

  return (
    <div className="min-h-screen flex bg-background">
      <div
        className="hidden lg:flex lg:w-[45%] relative overflow-hidden flex-col justify-center p-14"
        style={{ background: '#C12C27' }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 -left-10 w-72 h-72 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full bg-white/15 blur-2xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 space-y-10"
        >
          <div>
            <h2 className="text-5xl font-bold text-white leading-tight mb-5">
              One Window,
              <br />
              All Cloud.
            </h2>
            <p className="text-white/70 text-xl leading-relaxed max-w-sm">
              Switch workspace quickly and continue operating from a unified FinOps
              control plane.
            </p>
          </div>

          <div className="space-y-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-lg text-white/90">{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="absolute bottom-8 left-14 z-10 text-sm text-white/50"
        >
          Qocent FinOps Platform
        </motion.p>
      </div>

      <div className="flex-1 bg-background flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-lg space-y-6"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Workspace Console
              </p>
              <h1 className="text-2xl font-bold text-foreground">Switch Workspace</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Select a cloud provider workspace to continue.
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <IconLogout className="h-4 w-4" />
              Logout
            </button>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center gap-3 pb-4 border-b border-border">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                <IconCloud className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Available Workspaces</p>
                <p className="text-xs text-muted-foreground">
                  {user?.userEmail ?? "Signed-in account"}
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {(Object.keys(workspaceConfigs) as CloudProvider[]).map((providerId) => {
                const config = workspaceConfigs[providerId];
                const isActive = selectedProvider === providerId;

                return (
                  <button
                    key={providerId}
                    onClick={() => setSelectedProvider(providerId)}
                    className={`w-full rounded-xl border p-3 text-left transition-all ${
                      isActive
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border hover:border-primary/40 hover:bg-muted/30"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-lg bg-white border border-border flex items-center justify-center">
                          <img
                            src={config.logo}
                            alt={config.name}
                            className="h-6 w-6 object-contain"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{config.name}</p>
                          <p className="text-xs text-muted-foreground">{config.subtitle}</p>
                        </div>
                      </div>
                      {!config.available && (
                        <span className="text-[11px] px-2 py-1 rounded-full bg-muted text-muted-foreground">
                          Coming soon
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
              {initials || "U"}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {user?.userFirstName} {user?.userLastName}
              </p>
              <p className="text-xs text-muted-foreground truncate">{user?.userEmail}</p>
            </div>
          </div>

          <div className="flex justify-center">
          <Button
            onClick={handleContinue}
            disabled={!selectedConfig.available}
            className="w-fit h-10 text-xs rounded-xl"
            style={{ background: '#C12C27' }}
          >
            Continue to {selectedConfig.name}
            <IconArrowRight className="h-4 w-4" />
          </Button>

          </div>
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <IconLock className="h-3.5 w-3.5" />
            Workspace switching uses your current secure session.
          </div>
        </motion.div>
      </div>
    </div>
  );
};
