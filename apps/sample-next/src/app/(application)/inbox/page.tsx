"use client";

import { useCallback, useEffect, useState } from "react";
import { EnvelopeOpenIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  clearInbox,
  fetchInbox,
  markAllInboxItemsAsRead,
  ActitoInboxItem,
  openInboxItem,
} from "actito-web/inbox";
import { presentNotification } from "actito-web/push-ui";
import { useActitoState } from "@/actito/hooks/actito-state";
import { useOnInboxUpdated } from "@/actito/hooks/events/inbox/inbox-updated";
import { ActitoLaunchBlocker } from "@/components/actito/actito-launch-blocker";
import { Alert } from "@/components/alert";
import { InboxItem } from "@/components/inbox";
import { PageHeader, PageHeaderAction } from "@/components/page-header";
import { ProgressIndicator } from "@/components/progress-indicator";
import { logger } from "@/utils/logger";

export default function Inbox() {
  const state = useActitoState();
  const [reloadTrigger, setReloadTrigger] = useState<number>(0);
  const [inboxState, setInboxState] = useState<InboxState>({ status: "loading" });

  useEffect(
    function reloadInbox() {
      if (state.status !== "launched") return;

      fetchInbox()
        .then(({ items }) => setInboxState({ status: "success", items }))
        .catch((error) => setInboxState({ status: "failure", error }));
    },
    [state, reloadTrigger],
  );

  const forceInboxReload = useCallback(() => {
    setReloadTrigger((prevState) => prevState + 1);
  }, []);

  useOnInboxUpdated(() => forceInboxReload());

  const openItem = useCallback((item: ActitoInboxItem) => {
    openInboxItem(item)
      .then((notification) => presentNotification(notification))
      .catch((error) => logger.error(`Unable to open inbox item: ${error}`));
  }, []);

  const markAllItemsAsRead = useCallback(() => {
    markAllInboxItemsAsRead()
      .then(() => forceInboxReload())
      .catch((error) => setInboxState({ status: "failure", error }));
  }, [forceInboxReload]);

  const removeAllItems = useCallback(() => {
    clearInbox()
      .then(() => forceInboxReload())
      .catch((error) => setInboxState({ status: "failure", error }));
  }, [forceInboxReload]);

  return (
    <>
      <PageHeader
        title="Inbox"
        message="Easily manage your messages, conversations, and notifications in one centralized hub."
        actions={
          <>
            {state.status === "launched" && (
              <>
                <PageHeaderAction
                  label="Mark all as read"
                  icon={EnvelopeOpenIcon}
                  onClick={markAllItemsAsRead}
                />

                <PageHeaderAction label="Remove all" icon={TrashIcon} onClick={removeAllItems} />
              </>
            )}
          </>
        }
      />

      <ActitoLaunchBlocker>
        {inboxState.status === "loading" && (
          <ProgressIndicator title="Loading..." message="Slower than a stormtrooper's aim." />
        )}

        {inboxState.status === "success" && (
          <div className="flex flex-col gap-8">
            {inboxState.items.map((item) => (
              <InboxItem key={item.id} item={item} onClick={() => openItem(item)} />
            ))}
          </div>
        )}

        {inboxState.status === "failure" && (
          <Alert
            variant="error"
            message="Oops! The Force is not strong with this one."
            action={{ label: "Reload", onClick: forceInboxReload }}
          />
        )}
      </ActitoLaunchBlocker>
    </>
  );
}

type InboxState = LoadingInboxState | SuccessInboxState | FailureInboxState;

type State<T extends string> = { status: T };

type LoadingInboxState = State<"loading">;

type SuccessInboxState = State<"success"> & {
  items: ActitoInboxItem[];
};

type FailureInboxState = State<"failure"> & {
  error: Error;
};
