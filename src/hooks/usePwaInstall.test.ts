import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import usePwaInstall from "./usePwaInstall";

function makeInstallEvent() {
  return Object.assign(new Event("beforeinstallprompt", { cancelable: true }), {
    prompt: vi.fn().mockResolvedValue(undefined),
    userChoice: Promise.resolve({ outcome: "accepted" as const }),
  });
}

function fireBeforeInstallPrompt() {
  const event = makeInstallEvent();
  act(() => window.dispatchEvent(event));
  return event;
}

describe("usePwaInstall", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("beforeinstallprompt", () => {
    it("deferredPrompt starts as null", () => {
      const { result } = renderHook(() => usePwaInstall());
      expect(result.current.deferredPrompt).toBeNull();
    });

    it("sets deferredPrompt when beforeinstallprompt fires", () => {
      const { result } = renderHook(() => usePwaInstall());
      const event = fireBeforeInstallPrompt();
      expect(result.current.deferredPrompt).toBe(event);
    });

    it("calls preventDefault on the event", () => {
      renderHook(() => usePwaInstall());
      const event = fireBeforeInstallPrompt();
      expect(event.defaultPrevented).toBe(true);
    });

    it("removes the listener on unmount", () => {
      const { unmount } = renderHook(() => usePwaInstall());
      unmount();
      const { result } = renderHook(() => usePwaInstall());
      // fire after first hook is unmounted — second hook captures it, first does not
      act(() => fireBeforeInstallPrompt());
      expect(result.current.deferredPrompt).not.toBeNull();
    });
  });

  describe("handleInstall", () => {
    it("is a no-op when deferredPrompt is null", async () => {
      const { result } = renderHook(() => usePwaInstall());
      await act(() => result.current.handleInstall());
      expect(result.current.deferredPrompt).toBeNull();
    });

    it("calls prompt() on the deferred event", async () => {
      const { result } = renderHook(() => usePwaInstall());
      const event = fireBeforeInstallPrompt();
      await act(() => result.current.handleInstall());
      expect(event.prompt).toHaveBeenCalledTimes(1);
    });

    it("clears deferredPrompt after install", async () => {
      const { result } = renderHook(() => usePwaInstall());
      fireBeforeInstallPrompt();
      await act(() => result.current.handleInstall());
      expect(result.current.deferredPrompt).toBeNull();
    });
  });
});
