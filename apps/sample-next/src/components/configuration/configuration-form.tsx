import { useMemo } from "react";
import { ApplicationKeysSettingsCard } from "@/components/configuration/application-keys-settings-card";
import { ConfigurationFormState } from "@/components/configuration/configuration-form-state";
import { GeneralSettingsCard } from "@/components/configuration/general-settings-card";
import { GeolocationSettingsCard } from "@/components/configuration/geolocation-settings-card";
import { ServiceWorkerSettingsCard } from "@/components/configuration/service-worker-card";

export function ConfigurationForm({ state, onChange }: ConfigurationFormProps) {
  const onPartialChange = useMemo(() => {
    if (!onChange) return undefined;

    return (partial: Partial<ConfigurationFormState>) => {
      onChange({
        ...state,
        ...partial,
      });
    };
  }, [state, onChange]);

  return (
    <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 gap-8">
      <GeneralSettingsCard state={state} onChange={onPartialChange} />
      <ServiceWorkerSettingsCard state={state} onChange={onPartialChange} />
      <GeolocationSettingsCard state={state} onChange={onPartialChange} />

      {!onPartialChange && <ApplicationKeysSettingsCard />}
    </div>
  );
}

interface ConfigurationFormProps {
  state: ConfigurationFormState;
  onChange?: (state: ConfigurationFormState) => void;
}
