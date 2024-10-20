
 
export function TimelineWithIcon() {
  return (
   <main className=" px-6 mx-12 pt-20 ">
     <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
        <h1 className=" sm:text-4xl text-3xl text-center font-bold text-extraTeal text bg-center pb-[25px]">Our Process</h1>
        <li>
            <div className="timeline-middle">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5">
                <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd" />
            </svg>
            </div>
            <div className="timeline-start mb-10 md:text-end">
            <time className="font-bold text-base italic text-teal">Step 01</time>
            <div className="text-lg font-black">Search for your course</div>
            Nemo enim ipsam voluptatem quia voluptas sit atur aut odit aut fugit, sed quia consequuntur magni res.
            </div>
            <hr />
        </li>
        <li>
            <hr />
            <div className="timeline-middle">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5">
                <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd" />
            </svg>
            </div>
            <div className="timeline-end mb-10">
            <time className="font-bold text-base italic text-teal">Step 02</time>
            <div className="text-lg font-black">Take a Sample Lesson</div>
            Nemo enim ipsam voluptatem quia voluptas sit atur aut odit aut fugit, sed quia consequuntur magni res.
            </div>
            <hr />
        </li>
        <li>
            <hr />
            <div className="timeline-middle">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5">
                <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd" />
            </svg>
            </div>
            <div className="timeline-start mb-10 md:text-end">
            <time className="font-bold text-base italic text-teal">Step 03</time>
            <div className="text-lg font-black">Preview the Syllabus</div>
            Nemo enim ipsam voluptatem quia voluptas sit atur aut odit aut fugit, sed quia consequuntur magni res.
            </div>
            <hr />
        </li>
        <li>
            <hr />
            <div className="timeline-middle">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5">
                <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd" />
            </svg>
            </div>
            <div className="timeline-end mb-10">
            <time className="font-bold text-base italic text-teal">Step 04</time>
            <div className="text-lg font-black">Purchase the Course</div>
            Nemo enim ipsam voluptatem quia voluptas sit atur aut odit aut fugit, sed quia consequuntur magni res.
            </div>
            <hr />
        </li>
    </ul>
   </main>
  );
}