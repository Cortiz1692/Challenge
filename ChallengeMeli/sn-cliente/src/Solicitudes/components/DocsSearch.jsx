export const DocsSearch = ({search, handlerSearch}) => {

  return (
    <>
      <div className=" my-4">
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Nro de certificado que desea encontrar"
              aria-label="Search"
              value={search}
              onChange={handlerSearch}
            />
          </form>
        </div>
    </>
  );
};
