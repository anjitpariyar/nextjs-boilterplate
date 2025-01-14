import { sampleTablePropsData } from "utils/sample-data";
import { Container } from "styled/Container";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";

const TableBoard = dynamic(
  () => import("board-lukuku").then((mod) => mod.TableBoard),
  {
    ssr: false,
    loading: () => <p>...</p>,
  }
);
const Search = dynamic(() => import("board-lukuku").then((mod) => mod.Search), {
  ssr: false,
  loading: () => <p>...</p>,
});

const Goto = dynamic(() => import("board-lukuku").then((mod) => mod.Goto), {
  ssr: false,
  loading: () => <p>...</p>,
});
import { useRouter } from "next/router";

const IndexPage = () => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      value: (item: any) => (
        <div style={{ textAlign: "center" }}>{item.id}</div>
      ),
      width: "50px",
    },
    {
      title: <div style={{ textAlign: "left" }}>Title</div>,
      dataIndex: "title",
      value: (item: any) => (
        <div style={{ textAlign: "left" }}>
          <Link href={`product/${item.id}`}>
            <a>{item.title}</a>
          </Link>
        </div>
      ),
    },
    {
      title: "Writer",
      dataIndex: "writer",
      value: (item: any) => (
        <div style={{ textAlign: "center" }}>{item.writer}</div>
      ),
      width: "100px",
    },
    {
      title: "Viewcount",
      dataIndex: "viewcount",
      value: (item: any) => (
        <div style={{ textAlign: "center" }}>{item.viewcount}</div>
      ),
      width: "50px",
    },
  ];

  const router = useRouter();
  const page = router.query.page ? +router.query.page : undefined;
  const onPageChange = (n) => {
    if (n) {
      router.push(`/table-board/?page=${n}`, undefined, { shallow: true });
    }
  };
  const [theme, setTheme] = useState("theme3");

  const settings = {
    data: sampleTablePropsData, //data as json
    columns: columns, // way to use data
    pageSize: 10, // default pagesize is 10
    activePage: 1, // default is 1
    prev: <span>{"<"}</span>, // default is <,
    next: <span>{">"}</span>, // default is >,
    showCode: true, // default is false
    page: page,
    onPageChange: onPageChange, // required
    theme: theme, //option theme 1,2,3
  };

  // search Form submit
  const onFinish = (searchText) => {
    router.push(`/table-board/?keyword=${searchText}`, undefined, {
      shallow: true,
    });
  };

  // selectChange
  const selectChange = (e) => {
    setTheme(e.target.value);
  };

  return (
    <>
      {/*
        props

      */}
      {/* for now its a only wat to connect pagination and table */}
      <Container>
        <p>table</p>
        <div style={{ margin: "2em 0" }}>
          <Search
            placeholder="Search"
            buttonText={<span>Search</span>}
            onFinish={onFinish}
          />
        </div>
        <TableBoard {...settings} />
        <div style={{ margin: "2em 0" }}>
          <Goto
            data={sampleTablePropsData}
            onPageChange={onPageChange}
            pageSize={10}
          />
        </div>
        <select onChange={selectChange}>
          <option value="notheme">notheme</option>
          <option value="theme1">theme1</option>
          <option value="theme2">theme2</option>
          <option value="theme3">theme3</option>
        </select>
        {/* code */}
        <h2>How to use it</h2>
        <p>Imports</p>
        <div>
          <code>
            {`
import { sampleTablePropsData } from "utils/sample-data";
import dynamic from "next/dynamic";  
const TableBoard = dynamic(
  () => import("board-lukuku").then((mod) => mod.TableBoard),
    {
      ssr: false,
      loading: () => <p>...</p>,
    }
  );
  
const Search = dynamic(() => import("board-lukuku").then((mod) => mod.Search), {
  ssr: false,
  loading: () => <p>...</p>,
});
            
const Goto = dynamic(() => import("board-lukuku").then((mod) => mod.Goto), {
  ssr: false,
  loading: () => <p>...</p>,
});

import { useRouter } from "next/router";`}
          </code>

          <p>Function</p>
          <code>
            {`
               const columns = [
                {
                  title: "ID",
                  dataIndex: "id",
                  value: (item: any) => <span>{item.id}</span>,
                },
                {
                  title: "Title",
                  dataIndex: "title",
                  value: (item: any) => (
                    <Link href={"product/" + item.id}>
                      <a>{item.title}</a>
                    </Link>
                  ),
                },
                {
                  title: "Writer",
                  dataIndex: "writer",
                  value: (item: any) => <span>{item.writer}</span>,
                },
                {
                  title: "Viewcount",
                  dataIndex: "viewcount",
                  value: (item: any) => <span>{item.viewcount}</span>,
                },
              ];
            
              const router = useRouter();
              const page = router.query.page ? +router.query.page : undefined;
              const onPageChange = (n) => {
                if (n) {
                  router.push(/table-board/?page={n}, undefined, { shallow: true });
                }
              };
              const settings = {
                data: sampleTablePropsData, //data as json
                columns: columns, // way to use data
                pageSize: 10, // default pagesize is 10
                activePage: 1, // default is 1
                prev: <span>{"<"}</span>, // default is <,
                next: <span>{">"}</span>, // default is >,
                showCode: true, // default is false
                page: page,
                onPageChange: onPageChange, // required
              };
            
              // search Form submit
              const onFinish = (searchText) => {
                router.push(/table-board/?keyword={searchText}, undefined, {
                  shallow: true,
                });
              };
            
              `}
          </code>
          <p>Implementing Components</p>
          <code>
            {`
        <div style={{ margin: "2em 0" }}>
          <Search
            placeholder="Search"
            buttonText={<span>Search</span>}
            onFinish={onFinish}
          />
        </div>
        <TableBoard {...settings} />
        <div style={{ margin: "2em 0" }}>
          <Goto
            data={sampleTablePropsData}
            onPageChange={onPageChange}
            pageSize={10}
          />
        </div>
`}
          </code>
        </div>
      </Container>
    </>
  );
};

export default IndexPage;
