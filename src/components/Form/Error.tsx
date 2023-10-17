export default function Error({ children }: { children: any }) {
  return (
    <p className="text-red-600 text-xs font-light ml-1 mb-2 w-full break-words">
      {children}
    </p>
  );
}
