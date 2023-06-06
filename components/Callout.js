const Callout = ({ children, icon, type = 'default', ...props }) => {
  return (
    <div className="my-6 flex items-center rounded-md border border-l-4 px-3" {...props}>
      {icon && <span className="mr-4 text-2xl">{icon}</span>}
      <div>{children}</div>
    </div>
  );
};

export default Callout;
