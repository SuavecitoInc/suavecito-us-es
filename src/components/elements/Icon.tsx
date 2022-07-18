import clsx from 'clsx';

type IconProps = JSX.IntrinsicElements['svg'] & {
  direction?: 'up' | 'right' | 'down' | 'left';
};

function Icon({
  children,
  className,
  fill = 'currentColor',
  stroke,
  ...props
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      {...props}
      fill={fill}
      stroke={stroke}
      className={clsx('w-5 h-5', className)}
    >
      {children}
    </svg>
  );
}

export function AccountIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <title>Accounts</title>
      <circle cx="20" cy="10.5" r="4.5" strokeWidth="2" />
      <path
        d="M20 19C13.4375 19 9.5 20.2857 9.5 28H30.5C30.5 20.2857 26.5625 19 20 19Z"
        strokeWidth="2"
      />
    </Icon>
  );
}

export function IconMenu(props: IconProps) {
  return (
    <Icon {...props} stroke={props.stroke || 'currentColor'}>
      <title>Menu</title>
      <line x1="3" y1="6.375" x2="17" y2="6.375" strokeWidth="1.25" />
      <line x1="3" y1="10.375" x2="17" y2="10.375" strokeWidth="1.25" />
      <line x1="3" y1="14.375" x2="17" y2="14.375" strokeWidth="1.25" />
    </Icon>
  );
}

export function IconClose(props: IconProps) {
  return (
    <Icon {...props} stroke={props.stroke || 'currentColor'}>
      <title>Close</title>
      <line
        x1="4.44194"
        y1="4.30806"
        x2="15.7556"
        y2="15.6218"
        strokeWidth="1.25"
      />
      <line
        y1="-0.625"
        x2="16"
        y2="-0.625"
        transform="matrix(-0.707107 0.707107 0.707107 0.707107 16 4.75)"
        strokeWidth="1.25"
      />
    </Icon>
  );
}

export function IconArrow({direction = 'down'}: IconProps) {
  let rotate;

  switch (direction) {
    case 'down':
      rotate = 'rotate-0';
      break;
    case 'right':
      rotate = 'rotate-180';
      break;
    case 'up':
      rotate = '-rotate-90';
      break;
    case 'left':
      rotate = 'rotate-90';
      break;
    default:
      rotate = 'rotate-0';
  }

  return (
    <Icon className={`w-5 h-5 ${rotate}`}>
      <title>Arrow</title>
      <path d="M8.542 2.558a.625.625 0 0 1 0 .884l-3.6 3.6a.626.626 0 0 1-.884 0l-3.6-3.6a.625.625 0 1 1 .884-.884L4.5 5.716l3.158-3.158a.625.625 0 0 1 .884 0z" />
    </Icon>
  );
}

export function IconCaret({
  direction = 'down',
  stroke = 'currentColor',
  ...props
}: IconProps) {
  let rotate;

  switch (direction) {
    case 'down':
      rotate = 'rotate-0';
      break;
    case 'left':
      rotate = 'rotate-90';
      break;
    case 'right':
      rotate = '-rotate-90';
      break;
    case 'up':
      rotate = 'rotate-180';
      break;
    default:
      rotate = 'rotate-0';
  }

  return (
    <Icon
      {...props}
      className={`w-5 h-5 transition ${rotate}`}
      fill="transparent"
      stroke={stroke}
    >
      <title>Caret</title>
      <path d="M14 8L10 12L6 8" strokeWidth="1.25" />
    </Icon>
  );
}

export function IconSelect(props: IconProps) {
  return (
    <Icon {...props}>
      <title>Select</title>
      <path d="M7 8.5L10 6.5L13 8.5" strokeWidth="1.25" />
      <path d="M13 11.5L10 13.5L7 11.5" strokeWidth="1.25" />
    </Icon>
  );
}

export function IconBag(props: IconProps) {
  return (
    <Icon {...props}>
      <title>Bag</title>
      <path
        fillRule="evenodd"
        d="M8.125 5a1.875 1.875 0 0 1 3.75 0v.375h-3.75V5Zm-1.25.375V5a3.125 3.125 0 1 1 6.25 0v.375h3.5V15A2.625 2.625 0 0 1 14 17.625H6A2.625 2.625 0 0 1 3.375 15V5.375h3.5ZM4.625 15V6.625h10.75V15c0 .76-.616 1.375-1.375 1.375H6c-.76 0-1.375-.616-1.375-1.375Z"
      />
    </Icon>
  );
}

export function IconAccount(props: IconProps) {
  return (
    <Icon {...props}>
      <title>Account</title>
      <path
        fillRule="evenodd"
        d="M9.9998 12.625c-1.9141 0-3.6628.698-5.0435 1.8611C3.895 13.2935 3.25 11.7221 3.25 10c0-3.728 3.022-6.75 6.75-6.75 3.7279 0 6.75 3.022 6.75 6.75 0 1.7222-.645 3.2937-1.7065 4.4863-1.3807-1.1632-3.1295-1.8613-5.0437-1.8613ZM10 18c-2.3556 0-4.4734-1.0181-5.9374-2.6382C2.7806 13.9431 2 12.0627 2 10c0-4.4183 3.5817-8 8-8s8 3.5817 8 8-3.5817 8-8 8Zm0-12.5c-1.567 0-2.75 1.394-2.75 3s1.183 3 2.75 3 2.75-1.394 2.75-3-1.183-3-2.75-3Z"
      />
    </Icon>
  );
}

export function IconHelp(props: IconProps) {
  return (
    <Icon {...props}>
      <title>Help</title>
      <path d="M3.375 10a6.625 6.625 0 1 1 13.25 0 6.625 6.625 0 0 1-13.25 0ZM10 2.125a7.875 7.875 0 1 0 0 15.75 7.875 7.875 0 0 0 0-15.75Zm.699 10.507H9.236V14h1.463v-1.368ZM7.675 7.576A3.256 3.256 0 0 0 7.5 8.67h1.245c0-.496.105-.89.316-1.182.218-.299.553-.448 1.005-.448a1 1 0 0 1 .327.065c.124.044.24.113.35.208.108.095.2.223.272.383.08.154.12.34.12.558a1.3 1.3 0 0 1-.076.471c-.044.131-.11.252-.197.361-.08.102-.174.197-.283.285-.102.087-.212.182-.328.284a3.157 3.157 0 0 0-.382.383c-.102.124-.19.27-.262.438a2.476 2.476 0 0 0-.164.591 6.333 6.333 0 0 0-.043.81h1.179c0-.263.021-.485.065-.668a1.65 1.65 0 0 1 .207-.47c.088-.139.19-.263.306-.372.117-.11.244-.223.382-.34l.35-.306c.116-.11.218-.23.305-.361.095-.139.168-.3.219-.482.058-.19.087-.412.087-.667 0-.35-.062-.664-.186-.942a1.881 1.881 0 0 0-.513-.689 2.07 2.07 0 0 0-.753-.427A2.721 2.721 0 0 0 10.12 6c-.4 0-.764.066-1.092.197a2.36 2.36 0 0 0-.83.536c-.225.234-.4.515-.523.843Z" />
    </Icon>
  );
}

export function IconSearch(props: IconProps) {
  return (
    <Icon {...props}>
      <title>Search</title>
      <path
        fillRule="evenodd"
        d="M13.3 8.52a4.77 4.77 0 1 1-9.55 0 4.77 4.77 0 0 1 9.55 0Zm-.98 4.68a6.02 6.02 0 1 1 .88-.88l4.3 4.3-.89.88-4.3-4.3Z"
      />
    </Icon>
  );
}

export function IconCheck({
  stroke = 'currentColor',
  ...props
}: React.ComponentProps<typeof Icon>) {
  return (
    <Icon {...props} fill="transparent" stroke={stroke}>
      <title>Check</title>
      <circle cx="10" cy="10" r="7.25" strokeWidth="1.25" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m7.04 10.37 2.42 2.41 3.5-5.56"
      />
    </Icon>
  );
}

export function IconRemove(props: IconProps) {
  return (
    <Icon {...props} fill="transparent" stroke={props.stroke || 'currentColor'}>
      <title>Remove</title>
      <path
        d="M4 6H16"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M8.5 9V14" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.5 9V14" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M5.5 6L6 17H14L14.5 6"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 6L8 5C8 4 8.75 3 10 3C11.25 3 12 4 12 5V6"
        strokeWidth="1.25"
      />
    </Icon>
  );
}

export function IconAccessibility(props: IconProps) {
  return (
    <Icon {...props} fill="transparent" viewBox="0 0 77.58 77.58">
      <title>Accessibility</title>
      <g>
        <g>
          <path
            d="M286.98,161.27c-43.56,0-78.98-35.44-78.98-78.98s35.44-78.98,78.98-78.98s78.98,35.44,78.98,78.98
              S330.54,161.27,286.98,161.27z M286.98,41.22c-22.65,0-41.07,18.42-41.07,41.07s18.42,41.07,41.07,41.07s41.07-18.42,41.07-41.07
              S309.64,41.22,286.98,41.22z"
          />
        </g>
        <g>
          <path
            d="M375.57,571.98c-9.49,0-18.7-2.61-27.07-7.8c-9.34-5.79-16.72-14.52-21.36-25.22l-40.22-92.86l-40.02,92.81
            c-4.62,10.74-12.02,19.48-21.37,25.29c-15.18,9.4-33.09,10.34-50.47,2.62c-15.49-6.89-26.26-19.32-31.14-35.95
            c-4.18-14.29-3.21-30.14,2.75-44.63l67.69-164.8v-46.29l-105.82-15.87c-7.01-1.05-13.43-3.5-19.05-7.26
            c-19.37-12.92-27.86-34.71-23.3-59.77c4.74-26.06,19.27-37.61,30.62-42.72c12.01-5.41,22.83-4.55,24.88-4.32l0.91,0.13
            c1.09,0.18,109.6,17.53,164.43,18.14c54.84-0.6,163.34-17.96,164.43-18.14l0.91-0.13c18.48-2.04,48.53,8.78,55.5,47.04
            c4.55,25.02-3.91,46.79-23.22,59.72c-5.65,3.79-12.11,6.26-19.21,7.32l-105.76,15.86v46.28l67.69,164.8
            c5.95,14.49,6.93,30.34,2.75,44.63c-4.86,16.63-15.63,29.06-31.14,35.95C391.17,570.25,383.27,571.98,375.57,571.98z
            M286.82,350.51l75.09,173.37c1.53,3.53,3.85,6.4,6.55,8.07c3.02,1.88,7.46,3.59,15.1,0.2c5.28-2.36,8.41-6.04,10.15-11.96
            c1.77-6.06,1.27-13.01-1.43-19.57l-70.53-171.71v-86.41l138.04-20.7c1.48-0.23,2.77-0.68,3.72-1.32
            c6.64-4.45,8.88-11.26,7.02-21.45l0,0c-2.43-13.4-8.92-16.15-14.05-16.11c-11.78,1.87-113.88,17.9-169.3,18.46H287h-0.19
            c-55.41-0.57-157.53-16.58-169.3-18.46c-5.05-0.03-11.62,2.71-14.05,16.11c-1.85,10.2,0.38,17.01,7.04,21.46
            c0.95,0.63,2.2,1.08,3.64,1.29l138.12,20.71v86.41l-70.54,171.7c-2.7,6.56-3.21,13.52-1.43,19.57c1.74,5.93,4.86,9.62,10.15,11.96
            c7.63,3.4,12.07,1.67,15.1-0.19c2.69-1.67,5-4.54,6.54-8.07L286.82,350.51z"
          />
        </g>
      </g>
    </Icon>
  );
}
