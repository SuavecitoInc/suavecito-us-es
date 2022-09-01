import {useProductOptions} from '@shopify/hydrogen';
import {Image} from '@shopify/hydrogen';

import {Text} from '~/components';

interface Metafield {
  value: string;
  reference?: object;
}

export function ProductColorOptions({
  values,
  colorOptions = [],
  ...props
}: {
  values: any[];
  colorOptions?: Metafield[];
  [key: string]: any;
} & React.ComponentProps<typeof OptionsGrid>) {
  return <OptionsGrid values={values} colorOptions={colorOptions} {...props} />;
}

function OptionsGrid({
  values,
  colorOptions,
  name,
  handleChange,
  availableOptions,
}: {
  values: string[];
  colorOptions?: Metafield[];
  name: string;
  handleChange: (name: string, value: string) => void;
  availableOptions?: {[key: string]: any};
}) {
  const {selectedOptions} = useProductOptions();

  return (
    <>
      {values.map((value, index) => {
        const checked = selectedOptions![name] === value;
        const id = `option-${name}-${value}`;

        let disabledOption = false;
        if (index && availableOptions)
          disabledOption =
            index !== 0 ? !availableOptions[name]?.includes(value) : false;

        return (
          <Text
            as="label"
            key={id}
            htmlFor={id}
            className={`rounded-full cursor-pointer justify-self-center`}
          >
            <input
              className="sr-only"
              type="radio"
              id={id}
              name={`option[${name}]`}
              value={value}
              checked={checked}
              onChange={() => handleChange(name, value)}
              disabled={disabledOption}
            />
            <Image
              className={`rounded-full hover:border-2 hover:border-black hover:p-1 ${
                checked ? 'border-2 border-black p-1' : ''
              }`}
              // @ts-ignore
              data={colorOptions[index].reference.image}
              alt={value}
              width={60}
              height={60}
            />
          </Text>
        );
      })}
    </>
  );
}
