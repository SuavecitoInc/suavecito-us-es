import {useProductOptions} from '@shopify/hydrogen';

import {Text} from '~/components';

export function ProductOptions({
  values,
  ...props
}: {
  values: any[];
  [key: string]: any;
} & React.ComponentProps<typeof OptionsGrid>) {
  return <OptionsGrid values={values} {...props} />;
}

function OptionsGrid({
  values,
  name,
  handleChange,
  availableOptions,
  index,
}: {
  values: string[];
  name: string;
  handleChange: (name: string, value: string) => void;
  availableOptions?: {[key: string]: any};
  index?: number;
}) {
  const {selectedOptions} = useProductOptions();

  return (
    <>
      {values.map((value) => {
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
            className={`w-full h-full text-center border-2 border-black rounded-md p-1 cursor-pointer flex justify-center items-center ${
              checked
                ? 'bg-[#cccccc] text-black'
                : 'bg-white hover:bg-[#cccccc]'
            } ${
              disabledOption
                ? 'border-suave-white-focus hover:bg-white'
                : 'border-black hover:border-suave-grey :'
            }`}
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
            <div
              className={`leading-none py-1 cursor-pointer transition-all duration-200 ${
                disabledOption ? 'text-suave-white-focus' : ' text-black'
              }`}
            >
              {value}
            </div>
          </Text>
        );
      })}
    </>
  );
}
