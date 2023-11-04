import Link from "next/link";

export default function Home() {
    return (
        <main className="p-5">
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure><img src={"plants.jpg"} alt="Plants"/></figure>
                <div className="card-body">
                    <h2 className="card-title"> Plants </h2>
                    <p>Get the current status of your Plants!</p>
                    <div className="card-actions justify-end">
                        <Link href={'/plants'}>
                            <button className="btn btn-primary"> Get there </button>
                        </Link>
                    </div>
                </div>
            </div>

        </main>
    )
}
