'use client'
import { useState } from 'react'
import Link from 'next/link'
import styles from './NavBar.module.scss'
import useMediaQuery from '@/app/hooks/UseMediaQuery'
import logo from '../../assets/logo.webp'
import ActionButton from '../../shared/UI/buttons/ActionButton'
import { MdMenu } from 'react-icons/md'

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
							<Link href='/'>Home</Link>
							<Link href='/'>About</Link>
							<Link href='/'>Services</Link>
							<Link href='/'>Portfolio</Link>
							<Link href='/'>Contact</Link>
						</div>
						<div className={styles.signIn}>
							<p>
								<Link href='/login'>Sign In</Link>
							</p>
							<ActionButton>Become a Swin</ActionButton>
						</div>
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
								<Link href='/'>Home</Link>
								<Link href='/about'>About</Link>
								<Link href='/services'>Services</Link>
								<Link href='/portfolio'>Portfolio</Link>
								<Link href='/contact'>Contact</Link>
							</div>
						)}
					</>
				)}
			</div>
		</nav>
	)
}

export default NavBar
