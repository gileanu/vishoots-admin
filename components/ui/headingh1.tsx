interface HeadingH1Props {
  title: string | undefined;
  desc: string | undefined;
}

export const HeadingH1: React.FC<HeadingH1Props> = ({ title, desc }) => {
  return (
    <div>
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
        {title}
      </h1>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  );
};
