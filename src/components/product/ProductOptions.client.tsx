import {useProductOptions} from '@shopify/hydrogen';
import {BrandTheme} from '~/types/suavecito';

import {Text} from '~/components';

export function ProductOptions({
  theme = 'suavecito',
  values,
  ...props
}: {
  theme?: BrandTheme;
  values: any[];
  [key: string]: any;
} & React.ComponentProps<typeof OptionsGrid>) {
  return <OptionsGrid theme={theme} values={values} {...props} />;
}

function OptionsGrid({
  theme,
  values,
  name,
  handleChange,
  availableOptions,
  index,
}: {
  theme?: BrandTheme;
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

        const buttonStyles = `leading-none py-1 cursor-pointer transition-all duration-200 text-sm ${
          disabledOption ? 'text-suave-white-focus' : ' text-black'
        }`;

        const premiumBlendsButtonStyles = `leading-none py-1 cursor-pointer transition-all duration-200 text-sm ${
          disabledOption ? 'text-[#cccccc]' : ' text-white'
        }`;

        return (
          <Text
            as="label"
            key={id}
            htmlFor={id}
            className={`w-full h-full text-center border-2  ${
              theme === 'premium blends' ? 'border-white' : 'border-black'
            } rounded-md p-1 cursor-pointer flex justify-center items-center ${
              checked
                ? `${
                    theme === 'premium blends'
                      ? 'bg-[#808080] text-white'
                      : 'bg-[#cccccc] text-black'
                  }`
                : `${
                    theme === 'premium blends'
                      ? 'bg-black hover:bg-[#808080]'
                      : 'bg-white hover:bg-[#cccccc]'
                  }`
            } ${
              disabledOption
                ? `${
                    theme === 'premium blends'
                      ? 'border-suave-white-focus hover:bg-black'
                      : 'border-suave-white-focus hover:bg-white'
                  }`
                : `${
                    theme === 'premium blends'
                      ? 'border-white hover:bg-[#808080]'
                      : 'border-black hover:border-suave-grey'
                  }`
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
              className={`leading-none py-1 cursor-pointer transition-all duration-200 text-sm ${
                theme === 'premium blends'
                  ? premiumBlendsButtonStyles
                  : buttonStyles
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
