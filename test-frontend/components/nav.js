import Link from 'next/link';
import { useEffect, useState } from 'react';

const links = [
  { href: 'https://github.com/create-next-app/create-next-app', label: 'Github' }
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`
  return link
});

const Nav = () => { 
  const [data, setData] = useState({user:{name:"None", id: 0}});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://backend-serv-lemonteaa.cloud.okteto.net/smokes/2`);
      const newData = await response.json();

      setData(newData)
    };
  
    fetchData();
  }, [data.user.id])
  
  return (
  <nav>
    <ul>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        Your name is: {data.user.name}
      </li>
      <ul>
        {links.map(
          ({ key, href, label }) => (
            <li key={key}>
              <Link href={href}>
                <a>{label}</a>
              </Link>
            </li>
          )
        )}
      </ul>
    </ul>

    <style jsx>{`
      :global(body) {
        margin: 0;
        font-family: -apple-system,BlinkMacSystemFont,Avenir Next,Avenir,Helvetica,sans-serif;
      }
      nav {
        text-align: center;
      }
      ul {
        display: flex;
        justify-content: space-between;
      }
      nav > ul {
        padding: 4px 16px;
      }
      li {
        display: flex;
        padding: 6px 8px;
      }
      a {
        color: #067df7;
        text-decoration: none;
        font-size: 13px;
      }
    `}</style>
  </nav>
)};

export default Nav;
