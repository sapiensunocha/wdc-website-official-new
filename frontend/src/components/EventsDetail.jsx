import { useParams, Navigate, useLocation } from 'react-router-dom';
import Section from './Section';
import Heading from './Heading';
import { caseStudies } from '../assets/data/case_stadies';
import RequestDemo from './requestDemo';
import  PICTURE  from '../assets/images/Michael_picture.jpeg'
import { Link } from 'react-router-dom';

const EventsDetail = () => {

  const { newsName } = useParams();
  const location = useLocation();
  const { item } = location.state;
  if (!item) {
    return <Navigate to="/404" />;
  }
  console.log(item.doc)
  if (!item.doc) {
    window.open(item.link, '_blank', 'noopener,noreferrer');
    return <Navigate to="/Events" />;
  }
  console.log(item)

    return (
        <div className='justify-center items-center flex flex-col p-8 mt-10 mx-28'>
          <div className='border-2 mb-6 border-gray-400 rounded-full w-full'></div>
          <h1 className='text-5xl text-center font-bold mb-6'> 
            {item.title}
          </h1>
          <div className='border-2 mb-4 border-gray-400 rounded-full w-full'>
          </div>

          <div className='w-full px-32 m-8 mt-0'>
            {
              item.doc.map((block, index) => {
                switch (block.type) {
                  case "paragraph":
                    return <p key={index} className="mt-4 mb-10">{block.content}</p>;
                    
                  case "header":
                    return (<h1 key={index} className="mt-6 text-3xl font-semibold">{block.content}</h1>);
                  case "image":
                    return (
                      <div className='mb-10'>
                        <img
                            key={index}
                            src={block.src}
                            alt={block.alt}
                            className="mt-4 rounded-lg shadow-md mb-1"
                        />
                        <p className='text-gray-300'>{block.caption}</p>
                      </div>
                      
                  );
                  case "list":
                    return (
                      <ul key={index} className="list-disc pl-6 mb-10">
                          {block.items.map((item, i) => (
                              <li key={i} className="gap-4">{item}</li>
                          ))}
                      </ul>
                    );
                  case "quote":
                    return (
                      <blockquote
                          key={index}
                          className="mt-4 italic border-l-4 border-primary pl-4 mb-10"
                      >
                          {block.content}
                      </blockquote>
                    );
                  case "link":
                    return(
                      <Link
                        to = {block.href}
                        key = {index}
                        target = "_blank"
                        className = "text-lg font-bold text-gray-400 cursor-pointer hover:underline"
                      >
                        {block.content}
                      </Link>
                    )
                    
                  default: 
                    return null;
                }
              })
            }
          </div>
        </div>
    );
  };

  export default EventsDetail;