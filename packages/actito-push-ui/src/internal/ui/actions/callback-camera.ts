import {
  createBackdrop,
  createModal,
  createModalContent,
  createModalFooter,
  createModalHeader,
  createPrimaryButton,
  createRoot,
  createSecondaryButton,
} from '@actito/web-ui';
import { logger } from '../../../logger';
import { getApplicationIcon, getApplicationName } from '../../utils';
import { ROOT_ELEMENT_IDENTIFIER } from '../root';

export function createCameraCallbackModal({
  hasMoreSteps,
  onMediaCaptured,
  dismiss,
}: CreateCameraCallbackParams): HTMLElement {
  const root = createRoot(ROOT_ELEMENT_IDENTIFIER);
  const video = document.createElement('video');
  video.classList.add('actito__camera-callback-video');
  video.setAttribute('autoplay', '');

  let isCreatingStream = true;
  let streamPromise = createVideoStream();
  streamPromise
    .then((stream) => {
      video.srcObject = stream;
      isCreatingStream = false;
    })
    .catch((error) => {
      logger.error('Unable to acquire a video stream.', error);
      isCreatingStream = false;
    });

  root.appendChild(
    createBackdrop(async () => {
      dismiss();
      await streamPromise;
      cancelVideoStream(video);
    }),
  );

  const modal = root.appendChild(createModal());
  modal.classList.add('actito__camera-callback');

  modal.appendChild(
    createModalHeader({
      icon: getApplicationIcon(),
      title: getApplicationName(),
      onCloseButtonClicked: async () => {
        dismiss();
        await streamPromise;
        cancelVideoStream(video);
      },
    }),
  );

  const content = modal.appendChild(createModalContent());
  content.appendChild(video);

  const canvas = document.createElement('canvas');
  canvas.classList.add('actito__camera-callback-canvas');

  const footer = modal.appendChild(createModalFooter());
  footer.classList.add('actito__modal-footer__callback');

  const takePictureButton = footer.appendChild(
    createPrimaryButton({
      text: 'Take picture',
      onClick: async () => {
        const canvasContext = canvas.getContext('2d');
        if (!canvasContext) {
          logger.warning('The Canvas API is not available.');
          return;
        }

        // Draw the video stream onto the canvas.
        canvasContext.drawImage(video, 0, 0, canvas.width, canvas.height);

        content.removeChild(video);
        content.appendChild(canvas);

        footer.removeChild(takePictureButton);
        footer.appendChild(retakePictureButton);
        footer.appendChild(sendButton);

        // Stop the video stream.
        await streamPromise;
        cancelVideoStream(video);
      },
    }),
  );

  const retakePictureButton = createSecondaryButton({
    text: 'Retake picture',
    onClick: () => {
      content.removeChild(canvas);
      content.appendChild(video);

      if (!isCreatingStream) {
        cancelVideoStream(video);
        isCreatingStream = true;
        streamPromise = createVideoStream();
        streamPromise
          .then((stream) => {
            video.srcObject = stream;
            isCreatingStream = false;
          })
          .catch((error) => {
            logger.error('Unable to acquire a video stream.', error);
            isCreatingStream = false;
          });
      }

      footer.removeChild(retakePictureButton);
      footer.removeChild(sendButton);
      footer.appendChild(takePictureButton);
    },
  });

  const sendButton = createPrimaryButton({
    text: hasMoreSteps ? 'Continue' : 'Send',
    onClick: () => {
      canvas.toBlob((blob) => {
        if (!blob) {
          logger.warning('Unable to create a blob to upload.');
          return;
        }

        onMediaCaptured(blob, 'image/jpg');
      }, 'image/jpg');
    },
  });

  return root;
}

async function createVideoStream(): Promise<MediaStream> {
  const supported = 'mediaDevices' in navigator;
  if (!supported) throw new Error('WebRTC API unavailable.');

  return navigator.mediaDevices.getUserMedia({
    video: {
      width: 1280,
      height: 720,
    },
  });
}

function cancelVideoStream(video: HTMLVideoElement) {
  const stream = video.srcObject as MediaStream | null;
  stream?.getTracks()?.forEach((track) => track.stop());
  video.srcObject = null;
}

interface CreateCameraCallbackParams {
  hasMoreSteps: boolean;
  onMediaCaptured: (blob: Blob, mimeType: string) => void;
  dismiss: () => void;
}
