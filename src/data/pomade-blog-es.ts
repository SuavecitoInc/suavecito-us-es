interface Metafield {
  value: string;
  reference?: object;
}

interface BannerSection {
  settings: {
    type: 'BANNER';
    overlay: {
      display: boolean;
      opacity: number;
    };
  };
  data: {
    title?: string;
    image: Metafield;
  };
}

interface OneColumnSection {
  settings: {
    type: 'ONE_COLUMN';
  };
  data: {
    title?: string;
    content: string;
  };
}

interface TwoColumnSection {
  settings: {
    type: 'TWO_COLUMN';
    layout: 'IMAGE_EVEN' | 'IMAGE_TWO_THIRDS';
    title: {
      placement: 'TOP' | 'CONTENT';
      color: 'black' | 'suave-red';
      alignment: 'left' | 'center' | 'right';
    };
    image: {
      overlay: {
        display: boolean;
        opacity: number;
      };
      placement: 'LEFT' | 'RIGHT';
      title: {
        placement: 'BOTTOM_LEFT' | 'BOTTOM_RIGHT' | 'TOP_LEFT' | 'TOP_RIGHT';
        color: 'white' | 'black';
        display: boolean;
      };
    };
  };
  data: {
    title?: string;
    content: string;
    image: Metafield;
  };
}

export const pomadeBlogSettings: (
  | BannerSection
  | OneColumnSection
  | TwoColumnSection
)[] = [
  {
    settings: {
      type: 'BANNER',
      overlay: {display: true, opacity: 0.4},
    },
    data: {
      title: '¿Pomada, Cera,<br/> Clay, Gel, Pasta?',
      image: {
        value: '',
        reference: {
          mediaContentType: 'IMAGE',
          alt: 'Original Hold Pomade',
          previewimage: {
            overlay: {display: true, opacity: 0.4},
            url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/banner-background_2048x.jpg?v=1634575066',
          },
          image: {
            overlay: {display: true, opacity: 0.4},
            url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/banner-background_2048x.jpg?v=1634575066',
            width: 2048,
            height: 683,
          },
        },
      },
    },
  },
  {
    settings: {
      type: 'TWO_COLUMN',
      layout: 'IMAGE_EVEN',
      title: {
        placement: 'TOP',
        color: 'black',
        alignment: 'left',
      },
      image: {
        overlay: {display: true, opacity: 0.4},
        placement: 'RIGHT',
        title: {
          placement: 'BOTTOM_LEFT',
          color: 'white',
          display: true,
        },
      },
    },
    data: {
      title: '¿Cuál producto para el cabello es ideal para mi?',
      content: `<p class="my-6">Así que estás sentado ahí y te estás preguntando, “qué es lo que quiero en un producto de cabello y cual es para mí?” O alomejor no estas aqui for ninguna de esas razones y llegaste aqui por accidente. Pues, bienvenido!</p><p class="my-6">Como sea que no hayas encontrado, sigue leyendo y considera el tipo de cabello que tienes y el estilo que quieres lograr. En esta guía vamos a recorrer los diferentes tipos de productos para el cabello que existen y cuales funcionaran para ti y tu cabello.</p><p class="my-6">En primer lugar, dejemos una cosa fuera del camino:</p>`,
      image: {
        value: '',
        reference: {
          mediaContentType: 'IMAGE',
          alt: 'Original Hold Pomade',
          previewimage: {
            overlay: {display: true, opacity: 0.4},
            url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/img-txt1_540x.jpg?v=1634574192',
          },
          image: {
            overlay: {display: true, opacity: 0.4},
            url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/img-txt1_540x.jpg?v=1634574192',
            width: 540,
            height: 374,
          },
        },
      },
    },
  },
  {
    settings: {
      type: 'ONE_COLUMN',
    },
    data: {
      title:
        'Las ventajas de usar pomada, o cualquier otro producto, versus gel para el cabello basado en alcohol',
      content: `<p class="my-6">Los geles comprados en las tiendas, como el supermercado, la tienda de la esquina, o el salón son increíblemente dañinos para tu cabello. Los ingredientes principales trabajan para evaporar la humedad de los productos fuera de de tu cabello que deja tu cabello duro y crujiente. Por supuesto, este es el punto de usar estos productos. El producto se fijará dándote el estilo que quieres.</p><p class="my-6"><span class="text-suave-red font-bold">Las Pomadas</span></a> hacen lo mismo. No lo confundas, al final, el proceso es lo mismo que el gel, la humedad del producto también se evaporará y dejará lo bueno deteniendo tu cabello en su lugar. Sin embargo,  la manera que una pomada buena lograra esto es sin alcohol. El alcohol es dañino para tu cabello y tu piel. No quieres eso en tu cuerpo. Seca tu cabello. Eso es malo. Seca y daña la piel de tu cabeza dejando atrás resequedad y escamas. Eso es malo y asqueroso. Puede causar comezón, y dolor. Eso es muy malo. Tu no quieres nada de eso.</p><p class="my-6">Usa una pomada de una compañía de cabello acreditada que sabe lo que está haciendo. Estos productos mucho mejores no solo producirán mejores resultados pero también te mantendrán saludable. Te lo mereces. Todos se lo merecen.</p><p class="my-6">No uses gel para el cabello barato. Si a ti te gusta el gel, echa un vistazo a nuestro <a href="/products/firme-hold-styling-gel"><span class="text-suave-red font-bold">Gel Para Cabello Firme, nuestra versión de gel sin alcohol.</span></a></p>`,
    },
  },
  {
    settings: {
      type: 'TWO_COLUMN',
      layout: 'IMAGE_TWO_THIRDS',
      title: {
        placement: 'CONTENT',
        color: 'suave-red',
        alignment: 'center',
      },
      image: {
        overlay: {display: true, opacity: 0.4},
        placement: 'LEFT',
        title: {
          placement: 'BOTTOM_LEFT',
          color: 'white',
          display: false,
        },
      },
    },
    data: {
      title: 'Gel Para<br />Cabello Firme',
      content: `<ul><li>Fórmula sin alcohol no secara el cabello</li><li>Ideal para tipos de cabellos medios a grueso</li><li>Se lava fácilmente</li><li>Lavados fácilmente</li><li>Fragancia original de Suavecito</li></ul>`,
      image: {
        value: '',
        reference: {
          mediaContentType: 'IMAGE',
          alt: 'Original Hold Pomade',
          previewimage: {
            overlay: {display: true, opacity: 0.4},
            url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/pom-img2_720x.jpg?v=1634574731',
          },
          image: {
            overlay: {display: true, opacity: 0.4},
            url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/pom-img2_720x.jpg?v=1634574731',
            width: 720,
            height: 479,
          },
        },
      },
    },
  },
  {
    settings: {
      type: 'ONE_COLUMN',
    },
    data: {
      title: '¿Por qué usar una pomada?',
      content: `<p class="my-6">La pomada es maravillosa. La pones en tu cabello y tu cabello obedece. Es simple, efectiva y no tiene trucos. La pomada ha existido por mucho tiempo y por buena razón. En general, los resultados de las pomadas son las mismas, tienen poder de retención, huelen fantástico y duran todo el día.</p>`,
    },
  },
  {
    settings: {
      type: 'TWO_COLUMN',
      layout: 'IMAGE_EVEN',
      title: {
        placement: 'CONTENT',
        color: 'black',
        alignment: 'left',
      },
      image: {
        overlay: {display: true, opacity: 0.4},
        placement: 'LEFT',
        title: {
          placement: 'BOTTOM_LEFT',
          color: 'black',
          display: true,
        },
      },
    },
    data: {
      content: `<p class="my-6">Pomadas modernas, junto con todas las ramificaciones, siguen mejorando. Fórmulas están siendo refinadas en maneras increíbles y los productos no solo están mejorando super bien entregando los resultados que buscas, sino que también están incluyendo más aspectos saludables. Están viniendo llenos de vitaminas, aceites esenciales, y muchas otras cosas buenas para tu cabello. Y en cuanto a la salud, la conclusión principal en estos tiempos modernos es que estamos quitando los ingredientes malos, antiguos que las marcas de los tiempos anteriores no se dieron cuenta que tenían efectos dañinos. Las pomadas modernas son buenas y no son costosas.</p><p class="my-6">Si estas pagando mas para los productos de tu cabello que lo que pagas por tu corte del cabello, algo estas haciendo mal. Las mejores compañías en la industria saben cómo hacer estas pomadas asequibles. No es una ciencia exacta.</p>`,
      image: {
        value: '',
        reference: {
          mediaContentType: 'IMAGE',
          alt: 'Pomade Double Deal',
          previewimage: {
            overlay: {display: true, opacity: 0.4},
            url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/img-txt2_540x.jpg?v=1634574436',
          },
          image: {
            overlay: {display: true, opacity: 0.4},
            url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/img-txt2_540x.jpg?v=1634574436',
            width: 540,
            height: 489,
          },
        },
      },
    },
  },
  {
    settings: {
      type: 'ONE_COLUMN',
    },
    data: {
      title: 'Pomada basada en agua, en aceite, o híbrida?',
      content: `<p class="my-6">¿Cuál funcionará para ti? Todos estos productos de cabello van a detener tu cabello a cierto grado y usando suficiente de cualquier tipo te ayudará acercarte al peinado que quieras. Pero usando mucho del producto incorrecto no es la manera ideal de hacerlo. También te costará más dinero a la larga. Así que primero debemos entender las diferencias entre estas pomadas y lo que hacen.</p>`,
    },
  },
  {
    settings: {
      type: 'TWO_COLUMN',
      layout: 'IMAGE_EVEN',
      title: {
        placement: 'CONTENT',
        color: 'black',
        alignment: 'left',
      },
      image: {
        overlay: {display: true, opacity: 0.4},
        placement: 'RIGHT',
        title: {
          placement: 'BOTTOM_LEFT',
          color: 'black',
          display: false,
        },
      },
    },
    data: {
      title: 'Pomada a base de agua',
      content: `<p class="my-6">Una pomada que es basada en agua, o soluble en agua, es un producto de cabello que utiliza una fórmula que contiene agua. Obvio, verdad? Lo único de la pomada es que es un producto que se deshace fácilmente, haciéndolo fácil para aplicar y remover. No se ocupa ningun jabon o shampoo especial para quitar la pomada del cabello. La consistencia es cremosa y suave que hace que la pomada se pueda aplicar con facilidad. Abuelos de todo lugar estarian muy emocionados de esto en sus tiempos.</p>`,
      image: {
        value: '',
        reference: {
          mediaContentType: 'IMAGE',
          alt: 'Firme Hold Pomade',
          previewimage: {
            overlay: {display: true, opacity: 0.4},
            url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/pom-img4_540x.jpg?v=1634574756',
          },
          image: {
            overlay: {display: true, opacity: 0.4},
            url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/pom-img4_540x.jpg?v=1634574756',
            width: 540,
            height: 361,
          },
        },
      },
    },
  },
  {
    settings: {
      type: 'ONE_COLUMN',
    },
    data: {
      content: `<p class="my-6">La manera que este producto queda es una manera hermosa. Es muy científica así que no te aburriremos ahorita, nomas sabe que el agua en la fórmula se evapora solo dejándote con lo bueno. Lo bueno es que deja tu cabello en su lugar dejando té viendo estupendo. Una buena pomada a base de agua también provee una retención apretada y fuerte. Trabaja bien con todos los tipos de cabello y especialmente bien en el cabello grueso y rizado que a veces puede ser difícil para peinar usando otros tipos de productos.</p><p class="my-6">Tenemos dos ejemplos asombrosos de productos basados en aqua. Empezamos primero con nuestra <a href="/products/original-hold-pomade"><span class="text-suave-red font-bold">Pomada Original de retención media</span></a> para la mayoría de tipos o estilos de cabello. Trabaja especialmente bien con el cabello lacio y hace prácticamente todo lo que quieras que haga. Para cabello más rizado o grueso, usa nuestra pomada <a href="/products/firme-strong-hold-pomade"><span class="text-suave-red font-bold">increíblemente fuerte, la Pomada Firme.</span></a> Esta pomada puede abordar cualquier cosa que le des.</p><p class="my-6">Usa pomada a base de agua para: una retención fuerte y duradera, ningún efecto secundario como comezón o descascarilla y se lava con solo agua. Estila cabello medio a difícil de manejar, estilos apretados como pompadours, slick backs o side parts.</p>`,
    },
  },
  {
    settings: {
      type: 'TWO_COLUMN',
      layout: 'IMAGE_TWO_THIRDS',
      title: {
        placement: 'CONTENT',
        color: 'suave-red',
        alignment: 'center',
      },
      image: {
        overlay: {display: true, opacity: 0.4},
        placement: 'LEFT',
        title: {
          placement: 'BOTTOM_LEFT',
          color: 'black',
          display: false,
        },
      },
    },
    data: {
      title: 'Pomada Firme',
      content: `<ul><li>Retención fuerte, brillo mediano</li><li>Sin químicos fuertes - no secara el cabello</li><li>Pomada a base de agua</li><li>Ideal para todos los tipos de cabello, incluyendo cabello grueso o rizado</li><li>Se lava fácilmente con agua</li></ul>`,
      image: {
        value: '',
        reference: {
          mediaContentType: 'IMAGE',
          alt: 'Pomada Firme',
          previewimage: {
            overlay: {display: true, opacity: 0.4},
            url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/pom-img5_720x.jpg?v=1634574781',
          },
          image: {
            overlay: {display: true, opacity: 0.4},
            url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/pom-img5_720x.jpg?v=1634574781',
            width: 720,
            height: 480,
          },
        },
      },
    },
  },
  {
    settings: {
      type: 'TWO_COLUMN',
      layout: 'IMAGE_EVEN',
      title: {
        placement: 'TOP',
        color: 'black',
        alignment: 'left',
      },
      image: {
        overlay: {display: true, opacity: 0.4},
        placement: 'LEFT',
        title: {
          placement: 'BOTTOM_LEFT',
          color: 'black',
          display: false,
        },
      },
    },
    data: {
      title: '¿Pomada a base de aceite?',
      content: `<p class="my-6">Esta pomada es el tipo de pomadas de los tiempos antiguos que usaba tu abuelo y posiblemente sea la razón por que tu estas vivo y respirando. Ha existido por mucho tiempo y sigue siendo súper popular por buena razón. Tiene una fijación verdaderamente única y un método a su fórmula que te dará un look clásico que le gusta a mucha gente. La consistencia de la cera es resbalosa, posiblemente un poco grasosa y muy suave cuando se está aplicando al cabello. No se secará con una pomada a base de agua cuando está en tu cabello, en cambio crea una apariencia mojada que puede ser moldeable durante el día. Había una razón porque los greasers de los 50's siempre tenían un peine en su bolsillo. Lo usaban para arreglar su cabello. Fue genial. Sigue siendo.</p><p class="my-6">Si estás buscando un producto de cera para tu cabello que te dará una apariencia más tradicional y retrospectiva, entonces querrás usar un producto basado en aceite. Con las innovaciones de estos tiempos en fórmulas y tipos, la pomada basada en aceite de hoy no es tan imperfecta como el producto de ayer.</p>`,
      image: {
        value: '',
        reference: {
          mediaContentType: 'IMAGE',
          alt: 'Oil Based Pomade',
          previewimage: {
            overlay: {display: true, opacity: 0.4},
            url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/pom-img6_540x.jpg?v=1634574795',
          },
          image: {
            overlay: {display: true, opacity: 0.4},
            url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/pom-img6_540x.jpg?v=1634574795',
            width: 540,
            height: 594,
          },
        },
      },
    },
  },
  {
    settings: {
      type: 'TWO_COLUMN',
      layout: 'IMAGE_EVEN',
      title: {
        placement: 'CONTENT',
        color: 'black',
        alignment: 'left',
      },
      image: {
        overlay: {display: true, opacity: 0.4},
        placement: 'RIGHT',
        title: {
          placement: 'TOP_RIGHT',
          color: 'white',
          display: true,
        },
      },
    },
    data: {
      content: `<p class="my-6">Nuestra <a class="text-suave-red font-bold" href="/products/oil-based-pomade">Pomada/Cera a base de aceite</a> es la mejor de ambos mundos. Combina el sabor antiguo que buscas pero con una fórmula que no destruirá tu cabello o piel. La Pomada a base de Aceite de Suavecito hasta se lava en una o dos lavadas con champú delicado. No recibirás esa conveniencia con otras pomadas a base de agua, nuevas o viejas.</p><p class="my-6">Usa la pomada basada en aceite para: la apariencia antigua del pompadour, slick-backs apretados y tupes sólidos. Definitivamente hay un cierto encanto esa hora al mediodía donde llega la hoar de arreglar tu cabello con tu peine preferido. Es tan suave al tocar como al ver. Si lo sabes, lo sabes.</p>`,
      image: {
        value: '',
        reference: {
          mediaContentType: 'IMAGE',
          alt: 'Oil Based Pomade',
          previewimage: {
            overlay: {display: true, opacity: 0.4},
            url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/img-txt3_98f5dc06-d833-4ce5-8c5a-243c0ef96f8c_540x.jpg?v=1634575255',
          },
          image: {
            overlay: {display: true, opacity: 0.4},
            url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/img-txt3_98f5dc06-d833-4ce5-8c5a-243c0ef96f8c_540x.jpg?v=1634575255',
            width: 540,
            height: 373,
          },
        },
      },
    },
  },
  {
    settings: {
      type: 'TWO_COLUMN',
      layout: 'IMAGE_EVEN',
      title: {
        placement: 'TOP',
        color: 'black',
        alignment: 'left',
      },
      image: {
        overlay: {display: true, opacity: 0.4},
        placement: 'LEFT',
        title: {
          placement: 'BOTTOM_LEFT',
          color: 'black',
          display: false,
        },
      },
    },
    data: {
      title: 'La Pomada Híbrida',
      content: `<p class="my-6">Una de las cosas que nos gusta hacer en Suavecito es cambiar las cosas y tratar conceptos nuevos e interesantes. Nos mantiene entretenidos y cuando encontramos algo que en verdad trabaja, lo lanzamos y dejamos que el mundo lo disfrute con nosotros.</p><p class="my-6">Así que en realidad es una <a href="/products/premium-blends-hair-pomade"><span class="text-suave-red font-bold">pomada híbrida</span></a>? Pues, tomamos lo mejor del mundo de la pomada a base de agua y el mundo de la pomada a base de aceite y los combinamos para crear un producto, heterodoxo - lo sabemos! Lo lanzamos con nuestra línea Premium Blends y creamos algo que funciona super bien. No queremos simplificarlo demasiado pero es literalmente las dos pomadas a base de agua y aceite combinadas en una.</p>`,
      image: {
        value: '',
        reference: {
          mediaContentType: 'IMAGE',
          alt: 'Premium Blends Hair Pomade',
          previewimage: {
            overlay: {display: true, opacity: 0.4},
            url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/pom-img8_540x.jpg?v=1634574913',
          },
          image: {
            overlay: {display: true, opacity: 0.4},
            url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/pom-img8_540x.jpg?v=1634574913',
            width: 540,
            height: 388,
          },
        },
      },
    },
  },
  {
    settings: {
      type: 'TWO_COLUMN',
      layout: 'IMAGE_EVEN',
      title: {
        placement: 'TOP',
        color: 'black',
        alignment: 'left',
      },
      image: {
        overlay: {display: true, opacity: 0.4},
        placement: 'RIGHT',
        title: {
          placement: 'BOTTOM_LEFT',
          color: 'white',
          display: true,
        },
      },
    },
    data: {
      content: `<p class="my-6">¿Por qué? Pues, vamos a decir que te gusta los beneficios del agua pero quieres poder peinarte durante el día, o aunque sea verte más casual con tu look. Nuestra pomada híbrida se lava fácil y da una retención que es suficiente poderosa para hacer lo que necesitas. A la misma vez puedes recorrer tus dedos y estará bien.</p><p class="my-6">Usa la pomada híbrida para: apariencias casuales (cuando no quieres verte como que te esclavizaste sobre tu cabello esa mañana), bonitas partes laterales y para cuando quieres sentirte como que tu cabello no tiene nada. Se siente ligero pero no quiere decir que no haya nada ahí.</p>`,
      image: {
        value: '',
        reference: {
          mediaContentType: 'IMAGE',
          alt: 'Premium Blends Hair Pomade',
          previewimage: {
            overlay: {display: true, opacity: 0.4},
            url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/img-txt4_540x.jpg?v=1634574882',
          },
          image: {
            overlay: {display: true, opacity: 0.4},
            url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/img-txt4_540x.jpg?v=1634574882',
            width: 540,
            height: 353,
          },
        },
      },
    },
  },
  {
    settings: {
      type: 'ONE_COLUMN',
    },
    data: {
      title: 'Clay o pasta para el cabello?',
      content: `<p class="my-6">Estas son invenciones modernas cuando miramos la línea de tiempo de productos para el cabello. Los dos se inclinan hacia una apariencia de cabello más natural. Muchas de las veces cuando se usan estos productos es probable que no puedas ver exactamente que alguien lo tendrá en el cabello. Y a veces ese es el punto. Estos productos no son tan versátiles como las pomadas mencionadas previamente, pero todavía tienen retención considerable en su propio derecho. Estas clays y pastas de cabello son algo especial - de algo definitorio o al menos un impulso sobre pomadas de nuestra era moderna.</p>`,
    },
  },
  {
    settings: {
      type: 'TWO_COLUMN',
      layout: 'IMAGE_EVEN',
      title: {
        placement: 'TOP',
        color: 'black',
        alignment: 'left',
      },
      image: {
        overlay: {display: true, opacity: 0.4},
        placement: 'LEFT',
        title: {
          placement: 'BOTTOM_LEFT',
          color: 'black',
          display: false,
        },
      },
    },
    data: {
      title: 'Pomada Clay',
      content: `<p class="my-6">Esta es una pomada muy específica para un peinado y tipo de cabello específico. La fórmula de la pomada clay generalmente tiene una consistencia gruesa y tiesa y se puede moldear a algo manejable con fricción entre los dedos o las manos.</p><p class="my-6">La pomada clay provee un volumen debido a la arcilla en la fórmula. Cuando la pomada es introducida al agua se expande, que es la manera como nos da el volumen. Añadirá peso y estructura a tu cabello de una manera diferente que las pomadas a base de aceite o agua. </p>`,
      image: {
        value: '',
        reference: {
          mediaContentType: 'IMAGE',
          alt: 'Firme Clay Pomade',
          previewimage: {
            overlay: {display: true, opacity: 0.4},
            url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/pom-img10_540x.jpg?v=1634574931',
          },
          image: {
            overlay: {display: true, opacity: 0.4},
            url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/pom-img10_540x.jpg?v=1634574931',
            width: 540,
            height: 316,
          },
        },
      },
    },
  },
  {
    settings: {
      type: 'TWO_COLUMN',
      layout: 'IMAGE_EVEN',
      title: {
        placement: 'TOP',
        color: 'black',
        alignment: 'left',
      },
      image: {
        overlay: {display: true, opacity: 0.4},
        placement: 'RIGHT',
        title: {
          placement: 'TOP_RIGHT',
          color: 'white',
          display: true,
        },
      },
    },
    data: {
      content: `<p class="my-6">La <a class="text-suave-red font-bold" href="/products/firme-clay-pomade">Firme Clay de Suavecito</a> es un buen ejemplo de un producto de arcilla para tu cabello que es super fácil de usar y para lavar el cabello. No quieres tener que sufrir con productos que siguen en tu cabello después de bañar verdad? Esta Pomada Mate Clay añade volumen a tu cabello dándote la habilidad de peinar tupes, partes laterales, peinados más apretados dependiendo del tipo de tu cabello.</p><p class="my-6">Usa la pomada clay para: apariencias naturales. Un acabado mate. Trabaja mejor con tipos de cabellos fáciles para peinar al menos que estés tratando de lograr una apariencia desordenada (por ejemplo cabello rizado se vería estupendo peinado un poco desordenado con este producto).</p>`,
      image: {
        value: '',
        reference: {
          mediaContentType: 'IMAGE',
          alt: 'Firme Clay Pomade',
          previewimage: {
            overlay: {display: true, opacity: 0.4},
            url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/img-txt5_540x.jpg?v=1634574946',
          },
          image: {
            overlay: {display: true, opacity: 0.4},
            url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/img-txt5_540x.jpg?v=1634574946',
            width: 540,
            height: 394,
          },
        },
      },
    },
  },
  {
    settings: {
      type: 'TWO_COLUMN',
      layout: 'IMAGE_EVEN',
      title: {
        placement: 'TOP',
        color: 'black',
        alignment: 'left',
      },
      image: {
        overlay: {display: true, opacity: 0.4},
        placement: 'LEFT',
        title: {
          placement: 'BOTTOM_LEFT',
          color: 'black',
          display: false,
        },
      },
    },
    data: {
      title: 'Pomada (Pasta) Mate',
      content: `<p class="my-6">Esta viene en varios tipos de mezclas pero nuestro enfoque es que puedas peinarte sin que tu cabello tenga brillo. A algunos eso es muy importante y a otros no. Una manera para hacer la distinción para ti mismo sería mirar tu cabello seco y preguntarte si te queda bien.</p><p class="my-6">Pomadas mate vienen en una forma más parecida a una pasta. La fórmula es un poco más seca de lo que estás acostumbrado si estás usando una pomada más tradicional. Estas pomadas mates generalmente tienen una fijación de cuerpo medio y son perfectas para un look más suelto y casual. Es común que a la mayoría de la gente que les gusta nuestros productos de <a href="/products/matte-pomade"><span class="text-suave-red font-bold">textura pastosa, como nuestra Pomada Mate,</span></a> están tratando de lograr una apariencia más sutil, como si no tomaron tiempo peinándose en la mañana.</p>`,
      image: {
        value: '',
        reference: {
          mediaContentType: 'IMAGE',
          alt: 'Matte (Paste) Pomade',
          previewimage: {
            overlay: {display: true, opacity: 0.4},
            url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/pom-img12_540x.jpg?v=1634574964',
          },
          image: {
            overlay: {display: true, opacity: 0.4},
            url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/pom-img12_540x.jpg?v=1634574964',
            width: 540,
            height: 468,
          },
        },
      },
    },
  },
  {
    settings: {
      type: 'ONE_COLUMN',
    },
    data: {
      content: `<p class="my-6">Un producto de pasta para el cabello se mantendrá flexible durante el día, dándote la habilidad para volver a trabajarlo a tu gusto cuando sea necesario. Esta característica te da una apariencia más natural. Y como con cualquier producto para tu cabello, si usas un poco más tu look será más ajustado y pulido. Solo tendrás que experimentar con él.</p><p class="my-6>Usa una pasta para: Volver a trabajar el cabello durante el día. Nada o poco de brillo. Tener una apariencia de cabello natural y saludable con una fijación media.</p>`,
    },
  },
  {
    settings: {
      type: 'TWO_COLUMN',
      layout: 'IMAGE_TWO_THIRDS',
      title: {
        placement: 'CONTENT',
        color: 'suave-red',
        alignment: 'center',
      },
      image: {
        overlay: {display: true, opacity: 0.4},
        placement: 'LEFT',
        title: {
          placement: 'BOTTOM_LEFT',
          color: 'black',
          display: false,
        },
      },
    },
    data: {
      title: 'Pomada Mate',
      content: `<ul><li>Fijación media, sin brillo</li><li>Sí químicos agresivos - no te secara el cabello</li><li>Para looks sueltos, desordenados, o para hacer ver peinados más ajustados más casuales</li><li>Funciona para todos los tipos de cabello</li><li>Se lava fácil con agua</li></ul>`,
      image: {
        value: '',
        reference: {
          mediaContentType: 'IMAGE',
          alt: 'Matte (Paste) Pomade',
          previewimage: {
            overlay: {display: true, opacity: 0.4},
            url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/pom-img13_720x.jpg?v=1634574994',
          },
          image: {
            overlay: {display: true, opacity: 0.4},
            url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/pom-img13_720x.jpg?v=1634574994',
            width: 720,
            height: 482,
          },
        },
      },
    },
  },
  {
    settings: {
      type: 'TWO_COLUMN',
      layout: 'IMAGE_EVEN',
      title: {
        placement: 'TOP',
        color: 'black',
        alignment: 'left',
      },
      image: {
        overlay: {display: true, opacity: 0.4},
        placement: 'RIGHT',
        title: {
          placement: 'TOP_LEFT',
          color: 'white',
          display: true,
        },
      },
    },
    data: {
      title: 'Mate Versus Brillo',
      content: `<p class="my-6">Preferencia personal. 100%. Pero hay unas cosas que debes saber sobre los productos que te dan uno u otro.</p><p class="my-6">Productos mate generalmente se inclinan hacia la fijación voluminizadora media-ligera que muchas personas que buscan un aspecto casual prefieren. Esto no es verdad de todos los productos mate pero la mayoría si están en este rango. Encontrarás acabados mates, secos o neutros a partir de arcillas u productos híbridos.</p><p class="my-6">Productos que producen brillo y una apariencia húmeda normalmente vienen de productos a base de aceite y, en menor grado, productos solubles en agua. En promedio, encontrarás más fijación con un producto que induzca más brillo pero, por supuesto, este no es siempre el caso.</p>`,
      image: {
        value: '',
        reference: {
          mediaContentType: 'IMAGE',
          alt: 'Pomade Variety Pack',
          previewimage: {
            overlay: {display: true, opacity: 0.4},
            url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/img-txt6_540x.jpg?v=1634575011',
          },
          image: {
            overlay: {display: true, opacity: 0.4},
            url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/img-txt6_540x.jpg?v=1634575011',
            width: 540,
            height: 431,
          },
        },
      },
    },
  },
  {
    settings: {
      type: 'ONE_COLUMN',
    },
    data: {
      title: '¿Cual Pomada es Adecuada Para Ti?',
      content: `<p class="my-6">Honestamente, no hay una respuesta ideal para esta pregunta. Pero si podemos acercarnos bastante. Todos son diferentes y eso está bien. Lo que le funciona al cabello rizado de una persona no necesariamente funcionará al cabello rizado de otra persona. Eso sucede. Así que vamos hablar generalmente sobre tipos de cabellos, estilos, y cuales productos trabajas mejor con ellos. Entonces podemos dar algunos consejos para afinar eso a un grado más específico.</p>`,
    },
  },
  {
    settings: {
      type: 'TWO_COLUMN',
      layout: 'IMAGE_EVEN',
      title: {
        placement: 'CONTENT',
        color: 'black',
        alignment: 'left',
      },
      image: {
        overlay: {display: true, opacity: 0.4},
        placement: 'LEFT',
        title: {
          placement: 'BOTTOM_LEFT',
          color: 'black',
          display: false,
        },
      },
    },
    data: {
      title: 'Cabello Lacio',
      content: `<p class="my-6">No ocuparas un producto con una fijación fuerte para lograr la mayoría de los estilos que deseas. De hecho, dependiendo del grosor de tu cabello, puede causarle más daño que bien el usar algo pesado.  Vamos a decir que tienes cabello lacio y corto y solo quieres una parte lateral sencilla casi casual. Una dosis ligera de cualquiera de las pomadas que mencionamos anteriormente hará el trabajo. No quieres usar mucho. Usando mucho cuando no es necesario solo te pesara el cabello y se mirara poco raro.</p><p class="my-6">Siempre es mejor usar muy poco y usar más gradualmente que usar demasiado desde que empiezo. Acuerda eso!</p><p class="my-6">Otros estilos con un pompadour alto, slick back, peinado casual pueden ser logrados con la mayoría de estos productos. Cuanto mayor sea el pomp, más pomada se necesitará. Si estás buscando hacer algo más demandante necesitarás algo más fuerte. Una pomada fuerte a base de agua como nuestra pomada Firme Hold definitivamente detendrá tu cabello en su lugar. Qué es lo que tu quieres.</p><p class="my-6">Generalmente los productos que trabajan mejor son: pomadas a base de agua con fijaciones ligeras a medias, pomadas a base de aceite, de todos tipos, arcillas y pastas.</p>`,
      image: {
        value: '',
        reference: {
          mediaContentType: 'IMAGE',
          alt: 'Pelo lacio',
          previewimage: {
            overlay: {display: true, opacity: 0.4},
            url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/pom-img15_540x.jpg?v=1634575026',
          },
          image: {
            overlay: {display: true, opacity: 0.4},
            url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/pom-img15_540x.jpg?v=1634575026',
            width: 540,
            height: 768,
          },
        },
      },
    },
  },
  {
    settings: {
      type: 'TWO_COLUMN',
      layout: 'IMAGE_EVEN',
      title: {
        placement: 'CONTENT',
        color: 'black',
        alignment: 'left',
      },
      image: {
        overlay: {display: true, opacity: 0.4},
        placement: 'RIGHT',
        title: {
          placement: 'BOTTOM_LEFT',
          color: 'black',
          display: false,
        },
      },
    },
    data: {
      title: 'Cabello Rizado',
      content: `<p class="my-6">A veces una persona con cabello rizado puede pensar que su cabello es increíblemente difícil de peinar. Y al final de todo el cabello si tiene una mente propia. Pero ahí es donde se encuentra la magia del cabello rizado. Podemos atacar este cabello de dos maneras. La primera manera, y la manera más tratada, es de cubrir la cabeza con una buena dosis de una pomada o cera fuerte. Y si, con suficiente tiempo y paciencia funciona. Esta bien.</p><p class="my-6">Usa una pomada con fijación fuerte para calmar esos rizos como nuestra Pomade Firme Hold y estarás en el negocio. El cabello rizado no es imposible de calmar con perseverancia, el producto adecuado y tiempo. Solo tendrás que ser paciente.</p><p class="my-6">Pero como mencionamos, hay otra dirección que podemos tomar con el cabello rizado. No necesariamente tiene que ser domado completamente. Hay varios estilos que incorporan el los rizos naturales del cabello y aceptar lo al 100% sin tratar de esconderlo. Cuando estés trabajando con estos tipos de cabellos no necesitarás una pomada fuerte.</p>`,
      image: {
        value: '',
        reference: {
          mediaContentType: 'IMAGE',
          alt: 'Pelo rizado',
          previewimage: {
            overlay: {display: true, opacity: 0.4},
            url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/pom-img16_af1ae51b-d1e1-463e-99c3-e0cf6fbcd8b9_540x.jpg?v=1634575188',
          },
          image: {
            overlay: {display: true, opacity: 0.4},
            url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/pom-img16_af1ae51b-d1e1-463e-99c3-e0cf6fbcd8b9_540x.jpg?v=1634575188',
            width: 540,
            height: 676,
          },
        },
      },
    },
  },
  {
    settings: {
      type: 'ONE_COLUMN',
    },
    data: {
      content: `<p class="my-6">Cabello rizado se ve super bien desordenado si es hecho con poco esfuerzo. Hay poca diferencia entre el cabello literalmente cabeza de cama y el que es cabeza de cama después de 5 minutos enfrente del espejo. El que toma un poco más de esfuerzo tendrá mejores resultados durante el día. Añade un poco de nuestra pomada híbrida Premium Blends y seca con una secadora de cabello. Si no puedes ser molestado con secarte el cabello con la secadora, o no tienes una secadora está bien, solo asegurate que tu cabello esté aunque sea 75% seco cuando le estés agregando cualquier producto a tu cabello rizado.</p><p class="my-6">Cabello rizado es un cabello perfecto con que experimentar en tu cabello natural. Definitivamente tendrá una mente propia y a veces tendrás que seguirle la corriente.</p><p class="my-6">Doma lo con productos fuertes si tienes un look específico en mente o trata de añadir algo más ligero y suave para mover el cabello en una dirección más general. De cualquier manera tú escoges lo que trabaja bien para ti</p>`,
    },
  },
  {
    settings: {
      type: 'ONE_COLUMN',
    },
    data: {
      title: 'Sugerencias y Truco Generales',
      content: `<p class="my-6"><span class="font-bold">Habla con tu peluquero:</span> Ellos conocen tu cabello en una manera que es diferente a lo que tú podrás lograr. Ellos podrán ayudarte a encontrar no solo estilos que te queden bien, sino los productos perfectos para que puedas lograr el estilo. Preguntales a ellos que piensan e intentalo.</p><p class="my-6"><span class="font-bold">Tu cabello desarrolla una memoria propia con el tiempo.</span> Puedes entrenar a tu cabello que se comporte de cierta manera. Si siempre estás peinando tu cabello de una manera, cada día con o sin productos, el cabello querrá acostarse en esa dirección. Cuanto más tiempo dediques a peinarte el cabello según tus preferencias, más fácil será peinarlo. Esta es una buena práctica a tener en cuenta para las personas con algunos tipos de cabellos más difíciles de domar. No es perfecto, pero es un gran comienzo.</p><p class="my-6"><span class="font-bold">No tengas miedo de tratar algo nuevo.</span> Un nuevo estilo, nueva cera para el cabello, arcilla para el cabello, pomada o una nueva manera para lograr tu look. No solo hay una pomada “mejor” para ti.</p><p class="my-6"><span class="font-bold">Las secadoras de cabello no solo son para mujeres.</span> Pero tampoco son obligatorias.</p><p class="ny-6"><span class="font-bold">Toma el tiempo para buscar en el internet </span>fotos de estilos de cabello de hombres que tengan el cabello similar al tuyo y expande de ahí. Lo bueno de este mundo es que tienes la habilidad de cambiar tu look cuando quieras y tienes acceso a marcas que tienen una variedad de productos con que puedes experimentar.</p><p class="my-6">Esto no pretende tener todas las respuestas para ti, sino darte un buen comienzo. Esperamos que esto te haya proveído alguna alimentación para comenzar un nuevo camino en tu viaje de verte y sentirte bien. Recuerda, este tipo de cosas debería ser divertido y no te debería estresar mucho cuando experimentes con tu look. Todos tienen malos días de cabello de vez en cuando. Sucede, y está bien. Sigue haciéndolo y no habrá nada que te pueda detener.</p><p class="my-6">Esperamos que esta pequeña guía haya sido una buena lectura y hayas aprendido algo nuevo. Si tienes alguna pregunta sobre nuestros productos no dudes en contactarnos, que estaremos encantados de ayudarte. Y no olvides de preguntarle a tu peluquero por su recomendación sobre tu cabello y estilo único. ¡Son profesionales por una razón!</p><p class="my-6">Cuídate y mantente Firme,<br />Suavecito Pomade</p>`,
    },
  },
];
