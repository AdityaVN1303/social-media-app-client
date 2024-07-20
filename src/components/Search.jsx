import React, { useEffect, useState } from 'react'
import {PROXY_URL} from '../utils/constants'
import {toast} from 'react-hot-toast'
import Post from './Post'
import UserComponent from './UserComponent'

const Search = () => {

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);


  useEffect(() => {
	  const getPosts = async ()=>{
		try {

      const postResponse = await fetch(`${PROXY_URL}/api/posts/all` , {
				credentials : 'include'
			})

      const userResponse = await fetch(`${PROXY_URL}/api/users/all` , {
				credentials : 'include'
			})

			const postData = await postResponse.json();
      const userData = await userResponse.json();

			if (!postResponse.ok || !userResponse.ok) {
				toast(postData?.error || userData?.error);
				return;
			}
			// console.log(data);
      const data = [...postData , ...userData];
      console.log(data);
			setResults(data);
      setFilteredResults(postData);

		  } catch (error) {
			console.log(error);
		  }
	  }
	  getPosts();
	}, [])

  useEffect(() => {
    if (search && results) {
      const searchTextLowerCase = search.toLowerCase();
      console.log(results);
            const tempFilteringResults = results.filter((item) => {
              if (item?.text) {
                return item.text.toLowerCase().includes(searchTextLowerCase)
              } else {
                return item.username.toLowerCase().includes(searchTextLowerCase);
              }
            })
            // console.log(tempFilteringResults);
            setFilteredResults(tempFilteringResults);
    } else {
      setFilteredResults(results);
    }

  }, [search])


  

  return (
    <div className="bookmarks col-span-3 mr-auto border-r border-gray-700 min-h-screen w-full">
      <input placeholder='Search Post' type="text" className='p-3 w-3/4 mx-auto my-10 border block border-white bg-transparent text-white ' onChange={(e)=>{setSearch(e.target.value)}} value={search} />
      {
        filteredResults.length !== 0 ? filteredResults.map((item)=>{
         if (item?.text) {
          return <Post poster={item}/>
         } else {
          return <UserComponent user={item}/>
         }
        }) : <h1 className='font-bold text-2xl text-center my-10'>Empty</h1>
      }
    </div>
  )
}

export default Search