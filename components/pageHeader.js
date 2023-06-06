export function DocsPageHeader({ heading, text, className, ...props }) {
  return (
    <>
      <div className={`space-y-4 ${className}`} {...props}>
        <h1 className="font-heading mb-0 inline-block text-4xl">{heading}</h1>
        {text && <p className="text-muted-foreground text-xl">{text}</p>}
      </div>
      <hr className="mb-12 mt-4" />
    </>
  );
}
