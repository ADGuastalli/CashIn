import React from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface PropsModal {
  router: AppRouterInstance;
  user_id: string;
  onClose: () => void;
}
const ModalFormComplete: React.FC<PropsModal> = ({
  router,
  user_id,
  onClose,
}) => {
  return (
    <div
      className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10"
      onClick={onClose}
    >
      <div
        className="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full">
          <div className="m-8 my-20 max-w-[400px] mx-auto">
            <div className="mb-8">
              <h1 className="mb-4 text-3xl font-extrabold text-center">
                ¡Actualiza tu Perfil!
              </h1>
              <p className="text-gray-600 text-center">
                Esto nos ayudara a brindar respuestas mas exactas con nuestro
                asistente de AI.
              </p>
            </div>
            <div className="space-y-4">
              <button
                className="p-3 bg-actions rounded-full  w-full font-semibold"
                onClick={() => router.push(`/User/${user_id}/formProfile`)}
              >
                Ir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalFormComplete;
