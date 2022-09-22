interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
}

export function LogoutButton({props}: {props?: ButtonProps}) {
  const logoutTrans: {[key: string]: string} = {
    en: 'Logout',
    es: 'Cierre de sesión',
  };
  const LANG = import.meta.env.PUBLIC_LANGUAGE_CODE;

  const logout = () => {
    fetch('/account/logout', {method: 'POST'}).then(() => {
      if (typeof props?.onClick === 'function') {
        props.onClick();
      }
      window.location.href = '/';
    });
  };

  return (
    <button className="text-primary/50" {...props} onClick={logout}>
      {logoutTrans[LANG]}
    </button>
  );
}
