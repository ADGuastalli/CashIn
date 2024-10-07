import ImgHogar from "@/public/assets/svg/gastos/home.svg";
import imgAlim from "@/public/assets/svg/gastos/cutlery.svg";
import imgTrans from "@/public/assets/svg/gastos/car.svg";
import ImaAhorro from "@/public/assets/svg/gastos/piggy-bank.svg";
import ImgEdu from "@/public/assets/svg/gastos/books-stack-of-three.svg";
import ImgDona from "@/public/assets/svg/gastos/business-and-finance.svg";
import ImgSalud from "@/public/assets/svg/high-five.svg";
import ImgPres from "@/public/assets/svg/gastos/loan.svg";

export const categorias = [
    {
      tipo: "Servicios y Hogar",
      img: ImgHogar,
      subtipos: [
        "Alquiler",
        "Electricidad",
        "Agua",
        "Gas",
        "Telefono",
        "Celular",
        "Cable",
        "Internet",
        "Reparaciones",
        "Mantenimiento",
        "Servicios Domesticos",
        "Planta Electrica/Gasoil",
        "Jardineria",
        "Otros",
      ],
    },
    {
      tipo: "Alimentos y Cuidado Personal",
      img: imgAlim,
      subtipos: ["Alimentos", "Cuidado Personal", "Otros"],
    },
    {
      tipo: "Transporte",
      img: imgTrans,
      subtipos: [
        "Gasolina",
        "Seguro de Vehiculo",
        "Mantenimiento",
        "Limpieza",
        "Impuestos/Placa",
        "Reparaciones o Deducibles",
        "Transporte Escolar",
        "Otros",
      ],
    },
    {
      tipo: "Seguros e Impuestos",
      img: ImgDona,
      subtipos: [
        "Seguros de Salud",
        "AFP (Pensiones)",
        "Seguro de Vivienda",
        "Seguro de Vida",
        "Impuestos Personales",
        "Impuestos de Viviendas",
        "Otros",
      ],
    },
    {
      tipo: "Educacion y Recreacion",
      img: ImgEdu,
      subtipos: [
        "Colegios",
        "Uniformes, Libros, Materiales",
        "Sala de Tarea",
        "Clases de Idiomas",
        "Deportes",
        "Otros",
      ],
    },
    {
      tipo: "Diezmo y Ahorros",
      img: ImaAhorro,
      subtipos: [
        "Diezmo",
        "Ahorros",
        "Fondos de Contingencia",
        "Plan de Retiro",
        "Donativos",
        "Otros",
      ],
    },
    {
      tipo: "Miscelaneos",
      img: ImgSalud,
      subtipos: ["Vacaciones", "Recreacion", "Vestidos, Calzados", "Otros"],
    },
    {
      tipo: "Gastos Varios",
      img: ImgPres,
      subtipos: [
        "Cosmeticos, Perfumes, Accesorios",
        "Salon de Belleza/Barbero",
        "Lavanderia",
        "Comidas Fuera de Casa",
        "Revistas/Periodicos",
        "Regalos",
        "Propinas/Donaciones",
        "Mascotas (Alimentos, Veterinarios, Otros)",
        "Clubes y Gymnasios",
        "Otros",
      ],
    },
  ];