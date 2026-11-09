import Link from "next/link"

export default function Sidebar({ isSidebar, handleSidebar, isMobileMenu, handleMobileMenu}) {
	return (
		<>
			<div id="sidebar-area" className="sidebar-area">
				<button className="sidebar-trigger close" onClick={handleSidebar}>
					<svg className="sidebar-close" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="12.7px" viewBox="0 0 16 12.7" style={{ enableBackground: 'new 0 0 16 12.7' }} xmlSpace="preserve">
						<g>
							<rect x={0} y="5.4" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -2.1569 7.5208)" width={16} height={2} />
							<rect x={0} y="5.4" transform="matrix(0.7071 0.7071 -0.7071 0.7071 6.8431 -3.7929)" width={16} height={2} />
						</g>
					</svg>
				</button>
				<div className="sidebar-content">
					<div className="site-logo">
						<Link href="/#">
							<img className="logo-dark" src="/assets/img/logo/logo-dark-2.png" alt="logo" />
							<img className="logo-light" src="/assets/img/logo/logo-dark.png" alt="logo" />
						</Link>
					</div>
					<p>9621 Agnes Crossing, Lake Suzanneview, New Mexico Island 84604-9295.</p>
					<ul className="sidebar-info">
						<li><span>Call:</span> 5267-214-392</li>
						<li><span>Email:</span> Info.Leadflow@mail.com</li>
					</ul>
					<div className="list-post-area list-2">
						<div className="list-post-card">
							<div className="post-img">
								<Link href="/single-post-1"><img src="/assets/img/post/trending-post-1.jpg" alt="post" /></Link>
							</div>
							<div className="post-content">
								<h3 className="title">
									<Link href="/single-post-1">The Climate Shift in Allows Venice to Recover</Link>
								</h3>
								<span>July 29, 2024</span>
							</div>
						</div>
						<div className="list-post-card">
							<div className="post-img">
								<Link href="/single-post-1"><img src="/assets/img/post/trending-post-2.jpg" alt="post" /></Link>
							</div>
							<div className="post-content">
								<h3 className="title">
									<Link href="/single-post-1">Football and Figure Skating Collide to The Crowd’s Delight</Link>
								</h3>
								<span>July 29, 2024</span>
							</div>
						</div>
						<div className="list-post-card">
							<div className="post-img">
								<Link href="/single-post-1"><img src="/assets/img/post/trending-post-3.jpg" alt="post" /></Link>
							</div>
							<div className="post-content">
								<h3 className="title">
									<Link href="/single-post-1">Tips to Keep Cloud Storage Safe and Secure</Link>
								</h3>
								<span>July 29, 2024</span>
							</div>
						</div>
						<div className="list-post-card">
							<div className="post-img">
								<Link href="/single-post-1"><img src="/assets/img/post/trending-post-4.jpg" alt="post" /></Link>
							</div>
							<div className="post-content">
								<h3 className="title">
									<Link href="/single-post-1">The Season Courses and any Salads wow!</Link>
								</h3>
								<span>July 29, 2024</span>
							</div>
						</div>
					</div>
					<ul className="sidebar-social">
						<li>
							<Link href="/#"><i className="lab la-facebook-f" /></Link>
						</li>
						<li>
							<Link href="/#"><i className="lab la-twitter" /></Link>
						</li>
						<li>
							<Link href="/#"><i className="lab la-youtube" /></Link>
						</li>
						<li>
							<Link href="/#"><i className="lab la-behance" /></Link>
						</li>
					</ul>
				</div>
			</div>

			{isSidebar &&
				<div id="sidebar-overlay" onClick={handleSidebar} />
			}

		</>
	)
}
