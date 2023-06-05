const Callout = ({ children, icon, type = 'default', ...props }) => {
  return (
    <div
      className={`my-6 flex items-center rounded-md border border-l-4 px-3 ${
        type === 'warning'
          ? 'border-yellow-900 bg-yellow-50 dark:bg-yellow-300 dark:text-black'
          : ''
      }`}
      {...props}
    >
      {icon && <span className="mr-4 text-2xl">{icon}</span>}
      <div>{children}</div>
    </div>
  );
};

export default Callout;
