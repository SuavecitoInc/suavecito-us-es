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
      title: '¿Pomada, Cera<br/> Para el Cabello,<br/> Arcilla, Gel, Pasta?',
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
      title: '¿Qué producto para el cabello es adecuado para mí?',
      content: `<p class="my-6">Entonces, está sentado allí y se pregunta: "¿Qué quiero de un producto para el cabello y cuál es para mí?" O tal vez estás aquí sin ningún motivo y nos encontraste por accidente. Bien, ¡bienvenido!</p><p class="my-6">Sin embargo, encontraste esto, sigue leyendo y piensa qué tipo de cabello tienes y qué estilo quieres lograr. En esta guía, veremos los diferentes tipos de productos para el cabello que existen y cuáles funcionarán mejor para ti y tu cabello.</p><p class="my-6">Primero que nada, obtengamos los una cosa fuera del camino:</p>`,
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
        'Las ventajas de usar pomada, o cualquier otra cosa, versus gel para el cabello a base de alcohol',
      content: `<p class="my-6">Los geles comprados en la tienda, por ejemplo, en un supermercado, tienda de la esquina o salón de belleza, son increíblemente dañinos para tu cabello. Los ingredientes principales funcionan para evaporar la humedad del producto de tu cabello, lo que deja tu cabello crujiente y duro. Por supuesto, este es el punto de usar estos productos para el cabello. El producto se 'fijará' dándote el estilo que deseabas.</p><p class="my-6"><span class="text-suave-red font-bold">Las pomadas</span> hacen lo mismo cosa. No lo tuerzas, al final el proceso es el mismo que el de un gel, la humedad del producto se evaporará y dejará lo bueno que mantiene tu cabello en su lugar. Sin embargo, la forma en que una buena pomada logrará esto es sin alcohol. El alcohol es malo para el cabello y la piel. No quieres eso en ti. Te seca el pelo. Eso es malo. Se seca y daña la piel de la cabeza dejando escamas no deseadas. Eso es malo y asqueroso. Puede causar picazón, dolor y dolor. Es realmente malo. No quieres nada de eso.</p><p class="my-6">Usa una pomada de una compañía confiable de cuidado del cabello que sepa lo que está haciendo. Ejem. Estos productos mucho mejores no solo producirán mejores resultados, sino que lo mantendrán saludable. Te lo mereces. Todo el mundo se lo merece.</p><p class="my-6">No uses gel para el cabello barato. Si lo tuyo es el gel, echa un vistazo al <a class="text-suave-red font-bold" href="/products/firme-hold-styling-gel">Firme Hold Styling Gel, nuestra versión sin alcohol del gel para el cabello .</a></p>`,
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
      title: 'Firme Hold<br/>Styling Gel',
      content: `<ul><li>Fórmula sin alcohol que no reseca el cabello</li><li>Fijación durante todo el día sin descamación</li><li>Ideal para cabello de medio a grueso</li><li>Lavados fácilmente</li><li>Fragancia Suavecito original</li></ul>`,
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
      content: `<p class="my-6">La pomada es maravillosa. Te lo pones en el pelo y tu pelo obedece. Es simple, efectivo y no tiene trucos. Pomade existe desde hace mucho tiempo y por una buena razón. En general, los resultados en todos ellos son los mismos, tienen poder de fijación, huelen fantástico y duran todo el día.</p>`,
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
      content: `<p class="my-6">Las pomadas modernas, junto con todas sus ramificaciones, son cada vez mejores. Las fórmulas se están refinando de maneras sorprendentes y los productos no solo se están volviendo increíblemente buenos para brindar los resultados que desea, sino que ahora también incluyen más y más aspectos de salud. Vienen repletos de vitaminas, aceites esenciales y una gran cantidad de otras cosas buenas para tu cabello. Y en términos de salud, la conclusión principal en estos días modernos es que estamos eliminando los desagradables ingredientes de la vieja escuela que las marcas de antaño no se dieron cuenta del todo de que tenían efectos dañinos. La pomada moderna es genial y económica.</p><p class="my-6">Si estás pagando más por tus productos para el cabello que por tu corte de cabello, estás haciendo algo mal. Las mejores empresas de la industria saben cómo hacer que estas pomadas sean asequibles. Ejem. No es ciencia espacial.</p>`,
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
      title: '¿A base de agua, a base de aceite o híbrido?',
      content: `<p class="my-6">¿Qué va a funcionar para ti? Todos estos productos para el cabello mantendrán tu cabello hasta cierto punto y usar suficiente de cualquier tipo te acercará a la apariencia que deseas. Pero usar demasiado del producto equivocado no es la forma correcta de hacerlo. También le costará más dinero a largo plazo. Entonces, primero comprendamos qué son estos diferentes tipos de pomadas y qué hacen.</p>`,
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
      content: `<p class="my-6">Una pomada a base de agua, o soluble en agua, es un producto para el cabello que utiliza una fórmula que contiene agua. ¿verdad? Sin embargo, la singularidad de esto es que crea un producto que se descompone fácilmente, lo que lo hace fácil de aplicar y quitar. No se necesitan jabones ni champús especiales para eliminarlo del cabello. La consistencia es cremosa y suave, lo que significa que se puede trabajar en tu cabello con facilidad. Los abuelos de todas partes habrían estado muy entusiasmados con estas cosas en el pasado.</p>`,
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
      content: `<p class="my-6">La forma en que se fija el producto es algo hermoso. Es muy científico y no lo aburriremos en este momento, pero sepa que el agua en la fórmula se evapora y le deja solo lo bueno. Esas cosas buenas sobrantes mantienen tu cabello en su lugar y te hacen lucir genial. Una buena pomada a base de agua también proporciona una fijación muy firme y fuerte. Funcionan bien con todo tipo de cabello y especialmente bien con cabello grueso o rizado que a veces puede ser difícil de peinar con otros tipos de productos.</p><p class="my-6">Tenemos dos ejemplos asombrosos de un gran producto a base de agua. Primero comenzamos con nuestra <a class="text-suave-red font-bold" href="/products/original-hold-pomade">pomada de fijación original de fuerza media</a> para la mayoría de tipos y estilos de cabello. Funciona muy bien con cabello lacio y casi cualquier cosa que necesites que haga. Para el cabello más rebelde, rizado o grueso, usa la <a class="text-suave-red font-bold" href="/products/firme-strong-hold-poamde">Pomada Firme Hold, poderosamente fuerte.</a> Este material puede hacer frente a cualquier cosa que quieras arrojarle.</p><p class="my-6">Usa a base de agua para: fijación fuerte y duradera, sin efectos secundarios extraños como picazón o escamas y se lava con solo agua. Peinados de cabello medio a difícil de manejar, peinados ajustados como copetes, espaldas lisas o rayitas a los lados.</p>`,
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
      title: 'Firme (Strong) Hold Pomade',
      content: `<ul><li>Fijación fuerte, brillo medio</li><li>Sin productos químicos agresivos: no reseca el cabello</li><li>Pomada a base de agua</li><li>Ideal para todo tipo de cabello, incluido grueso o rizado</li><li>Se lava fácilmente con agua</li></ul>`,
      image: {
        value: '',
        reference: {
          mediaContentType: 'IMAGE',
          alt: 'Firme (Strong) Hold Pomade',
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
      content: `<p class="my-6">Este es el tipo de pomada de cera para el cabello de la vieja escuela que usaba tu abuelo y posiblemente por eso estás aquí vivo y respirando. Ha existido durante mucho tiempo y sigue siendo muy popular por una buena razón. Tiene una fijación y un método verdaderamente únicos en su fórmula que le darán un aspecto clásico que mucha gente realmente quiere. La consistencia de la cera es resbaladiza, posiblemente un poco grasosa y muy suave cuando se aplica en el cabello. No se secará como una base de agua cuando está en tu cabello, sino que crea una apariencia más húmeda que se puede volver a trabajar a lo largo del día. Por algo los engrasadores de los años 50 siempre llevaban un peine en el bolsillo trasero. Lo usaban para arreglarse el cabello. Y fue genial. Todavía lo es.</p><p class="my-6">Si está buscando un producto de cera para el cabello que le dé un aspecto más tradicional o retroactivo, entonces querrá usar un producto a base de aceite. Con las nuevas innovaciones actuales en fórmulas y tipos, la base de aceite de hoy no es tan imperfecta como el producto de ayer.</p>`,
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
      content: `<p class="my-6">Nuestra <a class="text-suave-red font-bold" href="/products/oil-based-pomade">Pomada/Cera a base de aceite</a> es la mejor de ambos mundos. Combina ese sabor de la vieja escuela que estás buscando, pero con una fórmula que no va a destrozar tu cabello ni tu cuero cabelludo. La pomada a base de aceite Suavecito incluso se lavará en uno o dos lavados con un champú suave. No obtendrá ese tipo de conveniencia con otras pomadas a base de aceite, nuevas o viejas.</p><p class="my-6">Use a base de aceite para: Esa apariencia retro única de copetes, negros ajustados y sólidos. tupés Definitivamente hay un cierto encanto en arreglar tu cabello al mediodía con tu peine favorito. Es tan suave al tacto como a la apariencia. Si lo sabes, lo sabes.</p>`,
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
      title: 'La pomada híbrida',
      content: `<p class="my-6">Una de las cosas que nos encanta hacer aquí en Suavecito es cambiar las cosas y probar nuevos conceptos interesantes. Nos mantiene entretenidos y cuando encontramos algo que realmente funciona, lo lanzamos y dejamos que el mundo lo disfrute con nosotros.</p><p class="my-6">Entonces, qué diablos es un <a class= "text-suave-red font-bold" href="/products/premium-blends-hair-pomade">pomada híbrida?</a> Bueno, tomamos lo mejor del mundo a base de agua y del mundo a base de aceite y ponerlos juntos en un solo producto, poco ortodoxo, ¡lo sabemos! Lo lanzamos con nuestra línea Premium Blends y creamos algo que funciona muy bien. No queremos simplificarlo demasiado, pero es literalmente una pomada a base de agua y aceite en uno.</p>`,
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
      content: `<p class="my-6">¿Por qué? Bueno, digamos que te gustan los beneficios del agua pero quieres volver a peinarte todo el día, o al menos ser un poco más casual con tu look. Nuestro híbrido se lava con facilidad y brinda una fijación lo suficientemente potente como para hacer lo que necesitas. Al mismo tiempo, puedes pasar tus dedos por él y estar bien.</p><p class="my-6">Usa la pomada híbrida para: looks casuales (cuando no quieras lucir como una esclava sobre tu cabello esa mañana), bonitas rayitas a los lados y para cuando quieras sentir que no hay nada en tu cabello. Se siente ligero, pero eso no significa que no haya nada allí.</p>`,
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
      title: '¿Arcilla para el cabello o pasta para el cabello?',
      content: `<p class="my-6">Estos son un invento muy moderno cuando se observa la línea de tiempo de los productos para el cuidado del cabello. Ambos se inclinan hacia los peinados de aspecto más natural que existen. Muchas veces, al usar estos productos, no podría decir exactamente que alguien lo tiene en el cabello. Y a veces ese es el punto. Estos productos no son tan versátiles como las pomadas enumeradas anteriormente, pero aún tienen un peso considerable por derecho propio. Estas arcillas y pastas para el cabello son algo especial: de alguna manera definen o al menos impulsan las pomadas de nuestra era moderna.</p>`,
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
      title: 'Pomada de arcilla',
      content: `<p class="my-6">Este es un tipo de pomada muy específico para cierto tipo de cabello y estilo. Una fórmula de arcilla para el cabello generalmente tiene una consistencia rígida y espesa que se descompondrá en algo manejable con la fricción entre las yemas de los dedos y las manos.</p><p class="my-6">Una pomada de arcilla proporcionará volumen debido a la arcilla en la fórmula. Cuando la arcilla se introduce en el agua, se expande, de ahí se obtiene el volumen. Agregará peso y estructura a tu cabello de una manera diferente a una pomada a base de aceite o agua.</p>`,
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
      content: `<p class="my-6">La <a class="text-suave-red font-bold" href="/products/firme-clay-pomade">Suavecito Firme Clay Pomade</a> es un gran ejemplo de un producto de arcilla para tu cabello que es súper fácil de usar y también muy fácil de lavar. Realmente no quieres tener que lidiar con productos que se quedan en tu cabello después de la ducha, ¿verdad? Esta arcilla mate agrega volumen a tu cabello, lo que te permite peinar tupés de aspecto natural, rayitas laterales y peinados más ajustados según tu tipo de cabello.</p><p class="my-6">Usa una arcilla para: Miradas naturales. Un acabado mate. Funciona mejor para un cabello más fácil de manejar, a menos que busque un aspecto más desordenado (estamos pensando en el cabello rizado aquí, que se ve increíble cuando se peina un poco desordenado con este producto).</p>`,
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
      title: 'Pomada mate (pasta)',
      content: `<p class="my-6">Este viene en todo tipo de mezclas, pero su enfoque principal es peinar sin darle brillo a tu cabello. Para algunos eso es súper importante y para otros no tanto. Una buena manera de hacer esa distinción por ti misma sería mirar tu cabello seco y preguntarte si te queda bien.</p><p class="my-6">Las pomadas mate vienen en una forma más parecida a una pasta forma. La fórmula es un poco más seca de lo que puede estar acostumbrado si está acostumbrado a una pomada más tradicional. Estas pomadas de pasta para el cabello mate generalmente tienen un cuerpo medio y son perfectas para un look más suelto o informal. Parece que la mayoría de las personas que buscan un <a class="text-suave-red font-bold" href="/products/matte-pomade">producto para peinar en pasta para el cabello, como nuestra Matte Pomade</a>, intentan lograr un look más sutil, como si no pasaran tiempo arreglándose el cabello por la mañana.</p>`,
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
      content: `<p class="my-6">Un producto de pasta para el cabello se mantendrá flexible durante todo el día, lo que te permitirá volver a trabajarlo a tu gusto cuando sea necesario. Esta característica le da ese aspecto “despreocupado” más natural. Y, como con cualquier producto para tu cabello, si usas un poco más, el aspecto se volverá más apretado y pulido. Solo tendrás que experimentar con él.</p><p class="my-6">Usa una pasta para: Estilo reelaborable durante todo el día. Nada a muy poco brillo. Cabello saludable de aspecto natural con una fijación de peso generalmente media.</p>`,
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
      title: 'Matte Pomade',
      content: `<ul><li>Fijación media, sin brillo</li><li>Sin productos químicos agresivos: no reseca el cabello</li><li>Úselo para estilos sueltos y desordenados o para hacer que los estilos más ajustados se vean más informales< /li><li>Funciona para todo tipo de cabello</li><li>Se lava fácilmente con agua</li></ul>`,
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
      title: 'Mate versus brillo',
      content: `<p class="my-6">Preferencia personal. 100%. Pero hay algunas cosas que debe saber sobre los productos que le brindan uno u otro.</p><p class="my-6">Los productos enfocados en mate generalmente se inclinan hacia esa fijación voluminizadora media-ligera que mucha gente después de los looks casuales prefiero. Esto no es cierto para todos los productos mate, pero la mayoría de ellos se encuentran en este rango. Encontrarás acabados mate, secos o neutros de arcillas o productos híbridos.</p><p class="my-6">Los productos que le darán más brillo a tu cabello y una apariencia más húmeda generalmente provienen de productos a base de aceite. y, en menor grado, productos solubles en agua. En promedio, encontrará más poder de fijación con un producto que induzca más brillo, pero, por supuesto, esto no siempre es así.</p>`,
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
      title: '¿Qué tipo de pomada es adecuada para ti?',
      content: `<p class="my-6">Honestamente, no hay una respuesta perfecta para esta pregunta. Pero podemos acercarnos bastante. Todo el mundo es diferente y eso está bien. Lo que podría funcionar para el cabello rizado de una persona podría no funcionar para el cabello rizado de otra. Sucede. Entonces, hablemos en general sobre tipos de cabello, estilos y qué productos combinan con ellos. Entonces podemos dar algunos consejos para afinar eso a un grado más estricto.</p>`,
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
      title: 'Pelo lacio',
      content: `<p class="my-6">No necesitarás un producto de fijación fuerte para obtener la mayoría de los looks que buscas. De hecho, dependiendo del grosor de tu cabello, puede hacer más daño que bien usar algo pesado. Digamos que tienes el pelo corto y lacio y solo quieres una raya lateral simple de una manera casi informal. Una dosis muy ligera de cualquiera de las pomadas que mencionamos anteriormente hará el trabajo. No querrás usar demasiado. Usar demasiado cuando no es necesario simplemente apelmazará el cabello y se verá un poco apagado.</p><p class="my-6">Siempre es mejor poner muy poco y trabajar más que usar demasiado. desde el principio. ¡Recuérdalo!</p><p class="my-6">Otros estilos, como un copete alto, espalda resbaladiza, casual de negocios cepillado, se pueden lograr con la mayoría de estos productos. Cuanto mayor sea la pompa, más pomada necesitarás. Si buscas hacer algo un poco más exigente, necesitarás algo más fuerte. Una fuerte base de agua como el Firme Hold aguantará muchísimo. Que es lo que querrás.</p><p class="my-6">Por lo general, los productos que funcionan mejor son: pomadas a base de agua con fijaciones ligeras a medias, pomadas de cera a base de aceite de todo tipo, arcillas y pastas. .</p>`,
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
      title: 'Pelo rizado',
      content: `<p class="my-6">A veces, una persona con cabello rizado puede pensar que es increíblemente difícil peinarlo. Y después de todo, el cabello tiene mente propia. Pero ahí reside la magia de una cabellera rizada. Podemos atacar este tipo de cabello de dos maneras. La primera forma, y el método más probado, es volar la cabeza con una buena dosis de una pomada o cera fuerte a prueba de balas. Y sí, con suficiente tiempo y paciencia funciona. Eso está bien.</p><p class="my-6">Use una pomada de fijación fuerte para domar esos rizos, como nuestra pomada de fijación firme, y estará en el negocio. Que el pelo rizado no es imposible de domar con constancia, el producto adecuado y el tiempo. Solo tendrás que tener paciencia.</p><p class="my-6">Pero, como se mencionó, hay otra dirección que podemos tomar con el cabello rizado. No necesariamente tiene que ser domesticado por completo. Hay una gran cantidad de estilos que incorporan el rizo natural del cabello y lo abrazan al 100% sin tratar de ocultarlo. Cuando trabaje con este tipo de estilos, no necesitará una pomada de gran impacto.</p>`,
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
      content: `<p class="my-6">El cabello rizado luce muy desordenado si se hace con un poco de esfuerzo. Hay una diferencia entre la verdadera cabeza de cama literal y 5 minutos frente al espejo "cabecera". El que requiere un poco más de esfuerzo va a rendir mucho mejores resultados durante el día. Agregue un poco de nuestra pomada Premium Blends de tipo híbrido y séquela. Si no puede molestarse en secarse con secador o no tiene un secador de pelo que esté bien, solo asegúrese de que su cabello esté seco al menos en un 75 % cuando agregue cualquier producto al cabello rizado.</p><p class=" my-6">El cabello rizado es un gran tipo de cabello para experimentar mientras utiliza su aspecto natural. Definitivamente tendrá una mente propia y, a veces, tendrás que dejarte llevar por la corriente.</p><p class="my-6">Doméntalo con un producto contundente si tienes un aspecto súper específico. necesita o toma la ruta más suave y agrega algo más ligero y suavemente persuadiendo al cabello en una dirección más "generalizada". De cualquier forma que elijas, hay una opción para ti.</p>`,
    },
  },
  {
    settings: {
      type: 'ONE_COLUMN',
    },
    data: {
      title: 'Consejos y trucos generales',
      content: `<p class="my-6"><span class="font-bold">Hable con su peluquero</span>. Llegan a conocer tu cabello de una manera diferente a cualquier cosa que puedas lograr. Ellos podrán ayudarte a encontrar no solo los estilos que se adapten a tu cabello, sino también los tipos de productos perfectos que te ayudarán a lograr ese estilo. Pregúntales qué piensan y pruébalo.</p><p class="my-6"><span class="font-bold">Tu cabello desarrollará una memoria con el tiempo.</span> Puedes entrena tu cabello para que se comporte de cierta manera. Si siempre peinas tu cabello de una manera, todos los días con o sin producto, el cabello comenzará a querer colocarse en esa dirección. Cuanto más tiempo dediques a peinarte el cabello según tus preferencias, más fácil será peinarlo. Esta es una buena práctica a tener en cuenta para las personas con algunos tipos de cabello más difíciles de domar. No es perfecto, pero es un gran comienzo.</p><p class="my-6"><span class="font-bold">No tengas miedo de probar algo nuevo.</span> Un nuevo peinado, una nueva cera para el cabello, arcilla o pomada para el cabello o una forma diferente de lograr tu look. No existe una pomada 'mejor' para ti.</p><p class="my-6"><span class="font-bold">Los secadores de cabello no son solo para mujeres.</span> tampoco son obligatorios.</p><p class="my-6"><span class="font-bold">Tómese un tiempo para buscar en línea</span> fotos de peinados de hombres que utilicen su tipo de cabello y ramificarse desde allí. Lo mejor de todo este mundo es que tienes la capacidad de cambiar tu apariencia cuando lo desees y tienes acceso a marcas que tienen una gran variedad de productos con los que puedes experimentar.</p><p class="my- 6">Esto no pretendía tener todas las respuestas para ti, sino darte un buen comienzo. Esperamos que esto le haya proporcionado algo de combustible para comenzar un nuevo camino en su viaje de verse y sentirse bien. Recuerda, este tipo de cosas deben ser divertidas y no debes estresarte demasiado mientras experimentas con tu apariencia. Todo el mundo tiene malos días de cabello de vez en cuando. Sucede y está bien. Sigue haciéndolo y no habrá nada que pueda detenerte.</p><p class="my-6">Esperamos que esta pequeña guía haya sido una buena lectura y que hayas aprendido algo nuevo. Si tiene alguna pregunta sobre los productos, no dude en comunicarse con nosotros, ya que estaremos encantados de ayudarle. Y no olvides pedirle consejo a tu barbero favorito sobre tu cabello y estilo únicos. ¡Son profesionales por algo!</p><p class="my-6">Cuídate y mantente Firme<br />Suavecito Pomade</p>`,
    },
  },
];
