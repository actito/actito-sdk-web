import { CloudDynamicLink } from '@actito/web-cloud-api';
import { ActitoDynamicLink } from '../../../models/actito-dynamic-link';

export function convertCloudDynamicLinkToPublic(link: CloudDynamicLink): ActitoDynamicLink {
  return {
    target: link.target,
  };
}
