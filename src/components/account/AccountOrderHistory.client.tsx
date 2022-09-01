import type {Order} from '@shopify/hydrogen/storefront-api-types';
import {Button, Text, OrderCard} from '~/components';

export function AccountOrderHistory({
  orders,
  lang = 'en',
}: {
  orders: Order[];
  lang?: 'en' | 'es';
}) {
  const orderData = {
    title: {
      en: 'Order History',
      es: 'Historial de pedidos',
    },
  };
  return (
    <div className="mt-6">
      <div className="grid w-full gap-4 p-4 py-6 md:gap-8 md:p-8 lg:p-12">
        <h2 className="font-bold text-lead">{orderData.title[lang]}</h2>
        {orders?.length ? (
          <Orders orders={orders} lang={lang} />
        ) : (
          <EmptyOrders lang={lang} />
        )}
      </div>
    </div>
  );
}

function EmptyOrders({lang = 'en'}: {lang?: 'en' | 'es'}) {
  const ordersData = {
    noOrders: {
      en: `You haven't placed any orders yet.`,
      es: `Todavía no has hecho ningún pedido.`,
    },
    startShopping: {
      en: `Start Shopping`,
      es: `Empezar a comprar`,
    },
  };
  return (
    <div>
      <Text className="mb-1" size="fine" width="narrow" as="p">
        {ordersData.noOrders[lang]}
      </Text>
      <div className="w-48">
        <Button className="text-sm mt-2 w-full" variant="secondary" to={'/'}>
          {ordersData.startShopping[lang]}
        </Button>
      </div>
    </div>
  );
}

function Orders({orders, lang = 'en'}: {orders: Order[]; lang?: 'en' | 'es'}) {
  return (
    <ul className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-1 false  sm:grid-cols-3">
      {orders.map((order) => (
        <OrderCard order={order} key={order.id} lang={lang} />
      ))}
    </ul>
  );
}
