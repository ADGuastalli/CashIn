import React from "react";

export default function InfoAdmin() {
  return (
    <div>
      <div className="flex flex-col justify-center items-center min-h-screen mx-20">
        <h1 className="text-3xl font-bold text-center mt-4">
          Panel del Administrador/a
        </h1>
        <h2 className="text-2xl text-center mt-20">
          {" "}
          En el Panel del Administrador/a tendrás acceso a una variedad de
          funciones para gestionar la plataforma:{" "}
        </h2>
        <ul className="list-disc list-inside mt-10 text-lg ">
          <li className="mb-6">
            <span className="font-bold text-xl">Usuarios Registrados:</span>
            <p className="text-lg mt-1 text-black font-bold">
              Podrás ver la cantidad total de usuarios registrados. Además,
              tendrás la opción de revisar sus perfiles y descripciones. Si es
              necesario, podrás eliminar usuarios de manera eficiente.
            </p>
          </li>
          <li className="mb-6">
            <span className="font-bold text-xl">
              Publicación y eliminacio de Cursos:
            </span>
            <p className="text-lg mt-1 text-black font-bold">
              Como administrador/a, podrás agregar nuevos cursos a la
              plataforma. Esto incluye proporcionar detalles sobre el curso,
              como título, descripción, contenido y recursos asociados. Si algún
              curso ya no es relevante o debe ser retirado, tendrás la capacidad
              de eliminarlo. Esto garantiza que la oferta de cursos esté siempre
              actualizada y de alta calidad.
            </p>
          </li>
          <li className="mb-6">
            <span className="font-bold text-xl">
              Carga y Eliminación de Libros:
            </span>
            <p className="text-lg mt-1 text-black font-bold">
              Además de los cursos, también podrás gestionar libros. Tendrás la
              opción de cargar nuevos libros a la plataforma, especificando su
              título, autor y otros detalles relevantes. Si un libro ya no es
              necesario o debe ser retirado, podrás eliminarlo con facilidad.
            </p>
          </li>
          <li className="mb-6">
            <span className="font-bold text-xl">Mercado Financiero:</span>
            <p className="text-lg mt-1 text-black font-bold">
              Como administrador/a, podrás gestionar el Mercado Financiero de la
              plataforma. Tendrás la capacidad de agregar nuevas categorías de
              Mercado Financiero. Si una categoría ya no es relevante o debe ser
              retirada, podrás eliminarla. Esto garantiza que la oferta de
              Mercado Financiero esté siempre actualizada y de alta relevancia.
            </p>
          </li>
          <li className="mb-2">
            <span className="font-bold text-xl">Gestión de Slots y Citas:</span>
            <p className="text-lg mt-1 text-black font-bold">
              Como administrador/a, tienes el poder de gestionar eficientemente
              los slots y las citas dentro de la plataforma. Puedes agregar
              nuevos slots para que los usuarios puedan reservar citas en los
              días que elijas. Solo necesitas especificar la fecha y la hora, ¡y
              listo! Además, tendrás la capacidad de eliminar slots que ya no
              son relevantes o que han expirado, lo que te permitirá mantener el
              calendario limpio y organizado. También podrás ver las citas
              reservadas y mantener un control sobre quién tiene su cita
              agendada, lo que te ayudará a gestionar mejor las
              disponibilidades. Y si los slots no se reservan a tiempo, ¡no te
              preocupes! Se eliminarán automáticamente cuando la fecha haya
              pasado, ahorrándote tiempo y esfuerzo en la gestión de la agenda.
              Todo esto te permite ofrecer una experiencia fluida y efectiva a
              los usuarios, asegurando que la plataforma esté siempre en óptimas
              condiciones.
            </p>
          </li>
        </ul>
        <h2 className="text-2xl text-center mt-10">
          En resumen, el Panel del Administrador/a te brinda el control
          necesario para mantener la plataforma organizada, actualizada y
          adaptada a las necesidades de los usuarios.
        </h2>
      </div>
    </div>
  );
}
