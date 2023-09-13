import React from 'react';
import Image from "next/image";
import styles from "./header.module.css"
import Link from "next/link";

const Header = () => {
    return (
        <div className={styles.header}>
            <Link href={"/"}>
                <Image
                    className={styles.logo}
                    src="/logo.png"
                    alt="-Logo-"
                    width={144}
                    height={100}
                />
            </Link>
        </div>
    );
};

export default Header;