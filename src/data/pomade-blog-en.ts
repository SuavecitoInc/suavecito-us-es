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
      title: 'Pomade, Hair<br/> Wax, Clay, Gel,<br/>Paste?',
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
      title: 'Which hair product is right for me?',
      content: `<p class="my-6">So, you’re sitting there and you’re asking yourself, “what do I want from a hair product and which one is for me?” Or maybe you’re here for no reason at all and found us by accident. Well, welcome!</p><p class="my-6">However you found this, read on and give a thought to what type of hair you have and what style you want to achieve. In this guide we’re going to walk through the different types of hair products out there and which ones will work best for you and your hair.</p><p class="my-6">First of all let’s get the one thing out of the way:</p>`,
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
        'The Advantages of using pomade, or anything else, versus alcohol-based hair gel',
      content: `<p class="my-6">Store bought gels from, say, a supermarket, corner store or salon are incredibly unhealthy for your hair. The main ingredients work to evaporate the moisture of the product out of your hair which leaves your hair crunchy and hard. Of course, this is the point of using these hair products. The product will ‘set’ giving you the style you wanted.</p><p class="my-6"><span class="text-suave-red font-bold">Pomades</span> do the same thing. Don’t get it twisted, in the end the process is the same as a gel, the moisture from the product will evaporate out and leave the good stuff holding your hair in place. However, the way a good pomade will achieve this is without alcohol. Alcohol is bad for your hair and skin. You do not want that on you. It dries your hair out. That’s bad. It dries and damages your skin on your head leaving behind unwanted flakes. That’s bad and gross. It can cause itching, soreness and pain. That’s really bad. You don’t want any of that.</p><p class="my-6">Use a pomade from a trusted reputable hair care company that knows what they’re doing. Ahem. These, far better products are not only going to produce better results they are going to keep you healthy. You deserve that. Everyone deserves that.</p><p class="my-6">Don’t use cheap hair gel. If gel is your thing, check out <a class="text-suave-red font-bold" href="/products/firme-hold-styling-gel">Firme Hold Styling Gel, our alcohol-free version of hair gel.</a></p>`,
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
      content: `<ul><li>Alcohol-free formula won't dry out hair</li><li>All day hold without flaking</li><li>Ideal for medium to thick hair types</li><li>Washes out easily</li><li>Original Suavecito fragrance</li></ul>`,
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
      title: 'Why Use A Pomade?',
      content: `<p class="my-6">Pomade is wonderful. You put it in your hair and your hair obeys. It’s simple, effective and has no gimmicks. Pomade has been around for a very long time and for good reason. Generally the results across all of them are the same, they have holding power, smell fantastic and last all day.</p>`,
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
      content: `<p class="my-6">Modern pomades, along with all the offshoots, are getting better and better. Formulas are being refined in amazing ways and the products are not only getting crazy good at delivering the results you want, but are now including more and more health aspects as well. They are coming packed with vitamins, essential oils and a whole host of other good things for your hair. And in terms of health, the main takeaway in this modern day is that we are removing the nasty oldschool ingredients that brands of yesteryear didn’t fully realize had damaging effects. Modern pomade is cool and inexpensive.</p><p class="my-6">If you’re paying more for your hair products than your haircut, you’re doing something wrong. The best companies in the industry know how to make these pomades affordable. Ahem. It’s not rocket science.</p>`,
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
      title: 'Water based, oil based or hybrid?',
      content: `<p class="my-6">What is going to work for you? All of these hair products are going to hold your hair to some degree and using enough of any one kind is going to get you close to the look you want. But using too much of the wrong product isn’t the right way to go about it. It’s also going to cost you more money in the long run. So, let’s first understand what these different types of pomade are and what they do.</p>`,
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
      title: 'Water Based Pomade',
      content: `<p class="my-6">A pomade that is water based, or water soluble, is a hair product that utilizes a formula containing water. Duh, right? The uniqueness about it though, is that it creates a product that breaks down easily, making it both easy to apply and easy to remove. No special soaps or shampoos are needed to release it out of your hair. The consistency is creamy and smooth meaning it can be worked into your hair with ease. Grandfathers everywhere would have been very excited about this stuff back in the day.</p>`,
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
      content: `<p class="my-6">The way the product sets is a beautiful thing. It’s very scientific and we won’t bore you right now, but just know that the water in the formula evaporates away leaving you with just the good stuff. That leftover good stuff holds your hair in place and keeps you looking great. A good water based pomade also provides a very tight and strong hold. They work well with all hair types and especially well on thick or curly hair that sometimes could be hard to style using other types of products.</p><p class="my-6">We have two amazing examples of a great water based product. We started first with our <a class="text-suave-red font-bold" href="/products/original-hold-pomade">medium strength Original Hold Pomade</a> for most hair types and styles. It works really well with straight hair and pretty much anything you need it do. For the more unruly curly or thick hair, use the <a class="text-suave-red font-bold" href="/products/firme-strong-hold-poamde">powerfully strong Firme Hold Pomade.</a> This stuff can tackle anything you want to throw at it.</p><p class="my-6">Use water based for: Strong long lasting hold, no weird side effects such as itch or flakes and washes out with just water. Styles medium to hard to manage hair, tight styles like pompadours, slick backs or side parts.</p>`,
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
      content:
        '<ul><li>Strong hold, medium shine</li><li>No harsh chemicals - wont dry out hair</li><li>Water based pomade</li><li>Best for all hair types, including thick or curly</li><li>Washes out easily with water</li></ul>',
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
      title: 'Oil Based Pomade?',
      content: `<p class="my-6">This is the old school type of hair wax pomade that your grandfather wore and possibly why you’re here alive and breathing. It’s been around for a long time and is still super popular for good reason. It has a truly unique hold and method to its formula that will give you a classic look that a lot of people really want. The wax’s consistency is slick, possibly a little greasy and very smooth when applying into your hair. It won’t dry like a water based when it’s in your hair, instead it creates a more wet look that can be reworked throughout the day. There was a reason that the greasers of the 50’s always had a comb in their back pocket. They used it to fix their hair. And it was cool. Still is.</p><p class="my-6">If you are looking for a hair wax product that will give a more traditional or throwback type look, then you’ll want to use an oil based product. With today’s new innovations in formulas and types, the oil based of today is not as imperfect as yesterday’s product.</p>`,
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
      content: `<p class="my-6">Our <a class="text-suave-red font-bold" href="/products/oil-based-pomade">Oil Based Pomade/Wax</a> is the best of both worlds. It combines that old school flavor you are looking for, but with a formula that isn’t going to destroy your hair and scalp. The Suavecito Oil Based Pomade will even wash out in a wash or two with some mellow shampoo. You will not get that type of convenience with other oil based pomades, new or old.</p><p class="my-6">Use oil based for: That unique throwback look of pompadours, tight slick-blacks and solid quiffs. There definitely is a certain charm to the midday fix of your hair with your favorite comb. It’s as smooth in touch/feel as it is in look. If you know, you know.</p>`,
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
      title: 'The Hybrid Pomade',
      content: `<p class="my-6">One of the things we love to do here at Suavecito is change things up and try new interesting concepts. It keeps us entertained and when we find something that really works, we release it and let the world enjoy it with us.</p><p class="my-6">So, what the heck is a <a class="text-suave-red font-bold" href="/products/premium-blends-hair-pomade">hybrid pomade?</a> Well, we took the best of both the water based world and the oil based world and put them together into one product, unorthodox - we know! We released it with our Premium Blends line and created something that works super well. We don’t want to over simplify it, but it’s literally both a water and oil based pomade in one.</p>`,
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
      content: `<p class="my-6">Why? Well, let’s say you like the benefits of water but want to recomb all day long, or at least be a little more casual with your look. Our hybrid washes out with ease and gives a hold that is powerful enough to do what you need. At the same time you can run your fingers through it and be fine.</p><p class="my-6">Use hybrid pomade for: casual looks (when you don’t want to look like you slaved over your hair that morning), nice side-parts and for when you want to feel like there’s nothing in your hair. It feels light but that doesn’t mean nothing is there.</p>`,
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
      title: 'Hair Clay or Hair Paste?',
      content: `<p class="my-6">These are a very modern invention when looking at the timeline of hair care products. They both lean towards the more natural looking hair styles out there. A lot of the time when using these products you wouldn’t exactly be able to tell that someone has it in their hair. And sometimes that’s the point. These products are not as versatile as the pomades listed above, but still hold considerable weight in their own right. These hair clays and pastes are a special thing - somewhat defining or at least pushing forward pomades of our modern age.</p>`,
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
      title: 'Clay Pomade',
      content: `<p class="my-6">This is a very specific type of pomade for a certain type of hair and style. A hair clay formula generally has a stiff, thick consistency to it that will break down into something manageable with friction between your fingertips and hands.</p><p class="my-6">A clay pomade will provide volume due to the clay in the formula. When the clay is introduced to water it expands, which is where you get the volume from. It will add weight and structure to your hair in a different way than an oil or water based pomade.</p>`,
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
      content: `<p class="my-6">The <a class="text-suave-red font-bold" href="/products/firme-clay-pomade">Suavecito Firme Clay Pomade</a> is a great example of a clay product for your hair that is super easy to use and also very easy to wash out. You really don’t want to have to deal with products that stay in your hair after a shower right? This Matte Clay adds volume to your hair, giving you the ability to style natural looking quiffs, side-parts and tighter styles depending on your hair type.</p><p class="my-6">Use a clay for: Natural looks. A matte finish. It works best for easier to manage hair unless you’re going for a more messy look (we’re thinking of curly hair here, which looks amazing when styled slightly messy with this product).</p>`,
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
      title: 'Matte (Paste) Pomade',
      content: `<p class="my-6">This one comes in all sorts of blends but its main focus is styling without giving your hair any shine. To some that is super important and to others not so much. A nice way of making that distinction for yourself would be to look at your hair dry and ask yourself if it looks good to you.</p><p class="my-6">Matte pomades come in a more paste-like form. The formula is a little dryer than what you may be used to if you’re used to a more traditional pomade. These matte hair paste pomades generally have a medium bodied hold and are perfect for a looser or more casual look. It seems that most people after a <a class="text-suave-red font-bold" href="/products/matte-pomade">hair paste styling product, like our Matte Pomade</a>, are trying to achieve a more subtle look, as if they didn’t spend time putting their hair together in the morning.</p>`,
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
      content: `<p class="my-6">A hair paste product will stay pliable throughout the day, giving you the ability to rework it to your liking whenever needed. This characteristic gives you that more natural “nonchalant” look. And, as with any product for your hair, if you use a little bit more the look will become tighter and more polished. You will just have to experiment with it.</p><p class="my-6">Use a paste for: Reworkable style throughout the day. None to very little shine. Healthy natural looking hair with generally a medium weight hold.</p>`,
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
      content: `<ul><li>Medium hold, no shine</li><li>No harsh chemicals - won't dry out hair</li><li>Use for loose, messy styles or to make tighter styles look more casual</li><li>Works for all hair types</li><li>Washes out easily with water</li></ul>`,
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
      title: 'Matte Versus Shine',
      content: `<p class="my-6">Personal preference. 100%. But there are some things you should know about the products that give you one or the other.</p><p class="my-6">Matte focused products generally lean towards that medium-light volumizing hold that a lot of people after casual looks prefer. This is not true of all matte products but the majority of them are in this range. You’ll find matte, dry, or neutral finishes from clays or hybrid products.</p><p class="my-6">Products that will give your hair more shine and a wetter look will typically come from oil based products and, to a lesser degree, water soluble products.On average you’ll find more holding power with a more shine inducing product but, of course, this isn’t always the case.</p>`,
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
      title: 'What type of poamde is right for you?',
      content: `<p class="my-6">Honestly, there is no perfect answer to this question. But we can get pretty close. Everyone is different and that is ok. What might work for one person’s curly hair might not for another’s curly hair. It happens. So let’s talk generally about hair types, styles and what products matches up with those. Then we can give some pointers to fine tune that down to a tighter degree.</p>`,
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
      title: 'Straight Hair',
      content: `<p class="my-6">You will not need a strong holding product to get most of the looks you’re after. In fact, depending on the thickness of your hair, it may do more harm than good to use something heavy. Let’s say you have a straight short hair and just want a simple side-part in an almost casual way. A very light dose of any of the pomades we mentioned above is going to get the job done. You do not want to use too much. Using too much when it’s not needed will just weigh the hair down and look a bit off.</p><p class="my-6">It’s always better to put in too little and work more in than to use too much from the get go. Remember that!</p><p class="my-6">Other styles such as a high pompadour, slick back, brushed business casual can all be achieved with most of these products. The higher the pomp, the more pomade you’ll need. If you are looking to do something a bit more demanding you’re going to need something stronger. A strong water based such as the Firme Hold is going hold the heck out of it. Which is what you’ll want.</p><p class="my-6">Generally the products that work best are: water based pomades with light to medium holds, oil based wax pomades of all types, clays and pastes.</p>`,
      image: {
        value: '',
        reference: {
          mediaContentType: 'IMAGE',
          alt: 'Straight Hair',
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
      title: 'Curly Hair',
      content: `<p class="my-6">Sometimes a person with curly hair may think it’s incredibly hard to style. And afterall the hair does have a mind of its own. But there inlies the magic of a curly head of hair. We can attack this hair type two ways. The first way, and the most tried method, is to blast the head with a healthy dose of a strong bulletproof pomade or wax. And yes, with enough time and patience it works. That’s fine.</p><p class="my-6">Use a strong holding pomade to tame those curls such as our Firme Hold Pomade and you’ll be in business. That curly hair is not impossible to tame with perseverance, the right product and time. You will just have to be patient.</p><p class="my-6">But, as mentioned, there is another direction we can take with curly hair. It doesn’t necessarily have to be tamed completely. There are a great many styles that incorporate the natural curl of the hair and embrace it 100% without trying to hide it. When working with these types of styles you will not need a heavy hitting pomade.</p>`,
      image: {
        value: '',
        reference: {
          mediaContentType: 'IMAGE',
          alt: 'Curly Hair',
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
      content: `<p class="my-6">Curly hair looks great messy if done with a little effort. There is a difference between true literal bed head and 5 minutes in front of the mirror “bed head”. The one that takes a little more effort is going to yield much better results during the day. Add in a little bit of our hybrid type Premium Blends Pomade and blow dry. If you can’t be bothered to blow dry or don’t have a hair dryer that is ok, just ensure that your hair is at least 75% dry when adding any product to curly hair.</p><p class="my-6">Curly hair is a great hair type to experiment with while utilizing it’s natural look. It will definitely have a mind of its own and sometimes you’ll just have to go with the flow.</p><p class="my-6">Tame it with a hard hitting product if you have a super specific look you need or take the mellower route and add in something lighter and gently coaxing the hair in a more “generalized” direction. Either way you choose there’s an option for you.</p>`,
    },
  },
  {
    settings: {
      type: 'ONE_COLUMN',
    },
    data: {
      title: 'General Tips and Tricks',
      content: `<p class="my-6"><span class="font-bold">Talk to your barber</span>. They get to know your hair in a way that is different than anything you can achieve. They will be able to help you find not only styles that suit your hair, but also the perfect product types that will help you achieve that style. Ask them what they think and give it a go.</p><p class="my-6"><span class="font-bold">Your hair will develop a memory over time.</span> You can train your hair to behave a certain way. If you are always combing your hair one way, every day with or without product, the hair will start to want to lay in that direction. The more time you devote to styling your hair in your preferred preference the easier it will become to style. This is a good practice to keep in mind for people with some harder to tame hair types. It’s not perfect but it’s a great start.</p><p class="my-6"><span class="font-bold">Do not be afraid to try something new.</span> A new hairstyle, a new hair wax, hair clay or pomade or a different way to achieve your look. There is not just one ‘best’ pomade for you.</p><p class="my-6"><span class="font-bold">Blow dryers are not just for women.</span> But they are also not mandatory.</p><p class="my-6"><span class="font-bold">Take some time to look online</span> at photos of men’s hairstyles that utilize your hair type and branch out from there. The great thing about this whole world is that you have the ability to change your look whenever you feel like it and you have access to brands that have huge ranges of products you can experiment with.</p><p class="my-6">This was not meant have every answer for you but instead give you a great start. We hope this provided you with some fuel to get started down a new path in your journey of looking and feeling good. Remember, this type of thing should be fun and you shouldn’t stress out too much as you’re experimenting with your look. Everyone has bad hair days once in a while. It happens and it’s fine. Keep on doing you and there won’t be anything out there that can stop you.</p><p class="my-6">We hope that this little guide was a good read and that you learned something new. If you have any questions about products do not hesitate to reach out to us, as we would be happy to help you. And do not forget to ask your favorite barber for their advice concerning your unique hair and style. They’re professionals for a reason!</p><p class="my-6">Take care and stay Firme<br />Suavecito Pomade</p>`,
    },
  },
];
