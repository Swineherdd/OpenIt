'use client'
import { useState } from 'react'
import Link from 'next/link'
import styles from './NavBar.module.scss'
import useMediaQuery from '@/app/hooks/UseMediaQuery'
import logo from '../../assets/logo.webp'
import ActionButton from '../../shared/UI/buttons/ActionButton'
import { MdMenu } from 'react-icons/md'
import { GoPerson } from 'react-icons/go'
import { CiLogin } from 'react-icons/ci'
type Props = {}

const NavBar = (props: Props) => {
	const isAboveMediumScreens = useMediaQuery('(min-width: 1060px)')
	const [isMenuToggle, setIsMenuToggle] = useState<boolean>(false)

	return (
		<nav className={styles.myNav}>
			<div className={styles.container}>
				<img src={logo.src} alt='logo' className={styles.logo} />
				{isAboveMediumScreens ? (
					<div className={styles.menu}>
						<div className={styles.menuLinks}>
							<CiLogin />
							<Link href='/login'>SignIn</Link>
							<GoPerson />
							<Link href='/'>Register</Link>
						</div>
						{/* <div className={styles.signIn}>
							<p>
								<Link href='/login'>Sign In</Link>
							</p>
							<ActionButton>Become a Swin</ActionButton>
						</div> */}
					</div>
				) : (
					<>
						<button
							className={styles.btnMobMenu}
							onClick={() => setIsMenuToggle(!isMenuToggle)}
						>
							<MdMenu className={styles.burgerMenu} />
						</button>
						{isMenuToggle && (
							<div className={styles.mobileMenu}>
								<Link href='/'>SignIn</Link>
								<Link href='/'>Register</Link>
							</div>
						)}
					</>
				)}
			</div>
		</nav>
	)
}

export default NavBar
