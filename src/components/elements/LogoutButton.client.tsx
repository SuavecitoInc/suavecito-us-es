interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
}

export function LogoutButton({
  props,
  lang = 'en',
}: {
  props?: ButtonProps;
  lang?: 'en' | 'es';
}) {
  const logoutTrans = {
    en: 'Logout',
    es: 'Cierre de sesión',
  };
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
      {logoutTrans[lang]}
    </button>
  );
}
