function Page({ data }: { data: Array<object> | any }) {
  // Render data...
  return (
    <div className="flex flex-wrap my-10 md:px-20 mx-auto justify-center items-center">
      {data.map(
        (repo: {
          html_url: string | undefined;
          id: null | undefined;
          name: string;
          stargazers_count: number;
          description: string;
        }) => (
          <div
            key={repo.id}
            className="flex mt-4 mx-2 rounded-lg bg-gradient-to-br from-blue-900 via-gray-900 to-red-900 
            bg-opacity-90 shadow-md shadow-red-500 w-1/4 max-h-36"
          >
            <a href={repo.html_url}>
              <div className="flex flex-col m-2 p-1 font-mono  text-blue-500">
                <div className="uppercase  text-xl font-bold flex justify-between">
                  <p className="flex wrap">{repo.name}</p>
                  <p>star:' '{repo.stargazers_count}</p>
                </div>

                <p className="text-gray-600 text-xs">{repo.description}</p>
              </div>
            </a>
          </div>
        )
      )}
    </div>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://api.github.com/users/danmesfin/repos`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}

export default Page;
