"use client";

import { useActitoState } from "@/actito/hooks/actito-state";
import { ActitoConfigurationBlocker } from "@/components/actito/actito-configuration-blocker";
import { DeviceRegistrationCard } from "@/components/home/device-registration-card";
import { DoNotDisturbCard } from "@/components/home/do-not-disturb-card";
import { InAppMessagingCard } from "@/components/home/in-app-messaging-card";
import { LocationCard } from "@/components/home/location-card";
import { NotificationsCard } from "@/components/home/notifications-card";
import { LaunchFlowCard } from "@/components/launch-flow-card";
import { PageHeader } from "@/components/page-header";

export default function Home() {
  const state = useActitoState();

  return (
    <>
      <PageHeader
        title="Welcome to the Actito sample app"
        message="Because every superhero needs a sidekick."
      />

      <ActitoConfigurationBlocker>
        <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 gap-8">
          <LaunchFlowCard />

          {state.status === "launched" && (
            <>
              <DeviceRegistrationCard />
              <NotificationsCard />
              <DoNotDisturbCard />
              <LocationCard />
              <InAppMessagingCard />
            </>
          )}
        </div>
      </ActitoConfigurationBlocker>
    </>
  );
}
