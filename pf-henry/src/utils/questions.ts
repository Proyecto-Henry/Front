interface Question {
  question: string;
  answer: string;
}

const adminQuestions: Question[] = [
  {
    question: "¿Cómo cargo una foto de perfil?",
    answer:
      "Una vez que inicie sesión, debajo del nombre habrá un botón seleccionar archivo. Ahí elige la imagen, una vez que la carga, debe tocar en el botón subir imagen.",
  },
  {
    question: "¿Cómo agrego una sucursal?",
    answer:
      "Una vez que inicie sesión, debajo de los datos personales habrá una tarjeta que tendrá un botón + que dice agregar nueva sucursal.",
  },
  {
    question: "¿Cómo puedo ver una de mis sucursales?",
    answer:
      "Una vez que inicie sesión, debajo de los datos personales se le cargarán en tarjetas las sucursales que tiene disponible. Tiene que hacer click en la tarjeta.",
  },
  {
    question: "¿Cómo agrego productos a mi sucursal?",
    answer:
      "Una vez que clickea en la tarjeta de la sucursal, ahí lo redireccionará a la vista de esa sucursal. Al lado del nombre, habrá un botón + para que pueda cargar los productos.",
  },
  {
    question: "¿Cómo elimino productos?",
    answer:
      "Una vez que clickea en la tarjeta de la sucursal, ahí lo redireccionará a la vista de esa sucursal en donde se cargará una lista de productos. En la última columna podrá realizar la acción de eliminar.",
  },
  {
    question: "¿Cómo veo las ventas?",
    answer:
      "Una vez que clickea en la tarjeta de la sucursal, ahí lo redireccionará a la vista de esa sucursal. Debajo de la lista de los productos habrá un botón llamado ver ventas y ahí se le redirigirá a una nueva página donde están todas las ventas de esa sucursal.",
  },
  {
    question: "¿Cómo elimino una sucursal?",
    answer:
      "Una vez que clickea en la tarjeta de la sucursal, ahí lo redireccionará a la vista de esa sucursal. Debajo de la lista de los productos habrá un botón llamado eliminar sucursal.",
  },
   {
    question: "¿Cómo cancelo mi suscripción?",
    answer:
      "Para cancelar tu suscripción, ve a la sección de 'Suscripciones' en tu panel de administrador y selecciona la opción 'Cancelar Suscripción'. Esto pausará tu plan al final del período actual.",
  },
  {
    question: "¿Cómo cambio de plan?",
    answer:
      "Puedes cambiar tu plan en la sección de 'Suscripciones' de tu panel. Los planes disponibles son: '1 tienda' por $10, '2 tiendas' por $18, y '4 tiendas' por $30. Selecciona el plan que prefieras y confirma el cambio. El nuevo plan se aplicará de inmediato.",
  },
  {
    question: "¿Cómo veo los detalles de mi suscripción?",
    answer:
      "Para ver los detalles de tu suscripción, como el plan, el estado y las fechas de inicio y fin, ve a la sección de 'Suscripciones' en tu panel de administrador. Allí encontrarás toda la información de tu plan actual.",
  },
  {
    question: "¿Qué hago si falla un pago?",
    answer:
      "Si hubo un problema con el pago de tu suscripción, puede que se haya pausado automáticamente. Si el problema persiste, contacta al soporte para ayudarte.",
  },
  {
    question: "¿Cuál es el horario de soporte?",
    answer:
      "El soporte está disponible de lunes a viernes de 9 a 18 hs. Puedes escribirnos enviándonos un correo a safestock08@gmail.com.",
  },


];

const storeQuestions: Question[] = [
  {
    question: "¿Por qué no tengo productos?",
    answer:
      "Es posible que el administrador no haya cargado ningún producto todavía.",
  },
  {
    question: "¿Cómo realizo una venta?",
    answer:
      "En el listado de productos disponibles, tienes que hacer click en el producto que desees agregar. Se abrirá un modal donde podrás elegir la cantidad que desees siempre que esté disponible. Luego haces click en agregar al carrito. Clickea en el carrito que se encuentra en la parte superior derecha, ahí se abrirá el carrito de la venta. Y seleccionas el botón realizar venta.",
  },
  {
    question: "¿Cómo elimino un producto del carrito?",
    answer:
      "Cuando abres el carrito, en la misma fila del producto que desees, clickeas el tacho de basura en la columna de acciones.",
  },
  {
    question: "¿Cómo subo o bajo la cantidad de un producto del carrito?",
    answer:
      "Dentro del carrito, junto a cada producto hay botones para aumentar o disminuir la cantidad antes de realizar la venta.",
  },
];

export { adminQuestions, storeQuestions };