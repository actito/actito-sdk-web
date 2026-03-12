import { getApplication } from "@actito/web-core";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { Tooltip } from "@/components/tooltip";

export function ApplicationInfo() {
  const application = getApplication();

  if (!application) return;

  return (
    <div>
      <Tooltip
        label={
          <span>
            <b>Application:</b> {application.name} ({application.id})
          </span>
        }
        position="left"
        delayOnShow={false}
        className="max-w-50 sm:max-w-max"
      >
        <InformationCircleIcon className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
      </Tooltip>
    </div>
  );
}
