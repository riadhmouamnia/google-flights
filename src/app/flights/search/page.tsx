// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Search({ searchParams }: { searchParams: any }) {
  const search = await searchParams;
  return (
    <div>
      <h1>Search</h1>
      <p>{JSON.stringify(search)}</p>
    </div>
  );
}
