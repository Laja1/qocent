import { useCallback, useEffect, useState } from "react";

const RESEND_COOLDOWN_SECONDS = 90;

function formatCooldown(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export function useResendOtpCooldown(cooldownSeconds = RESEND_COOLDOWN_SECONDS) {
  const [secondsLeft, setSecondsLeft] = useState(cooldownSeconds);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timer = window.setInterval(() => {
      setSecondsLeft((current) => Math.max(current - 1, 0));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [secondsLeft]);

  const resetCooldown = useCallback(() => {
    setSecondsLeft(cooldownSeconds);
  }, [cooldownSeconds]);

  return {
    canResend: secondsLeft === 0,
    secondsLeft,
    formattedCooldown: formatCooldown(secondsLeft),
    resetCooldown,
  };
}
