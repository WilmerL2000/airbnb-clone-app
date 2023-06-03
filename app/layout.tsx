import Modal from './components/modals/Modal';
import RegisterModal from './components/modals/RegisterModal';
import Navbar from './components/navbar/Navbar';
import './globals.css';
import { Nunito } from 'next/font/google';
import ToasterProvider from './providers/ToasterProvider';
import LoginModal from './components/modals/LoginModal';

const font = Nunito({ subsets: ['latin'] });

export const metadata = {
  title: 'Airbnb Clone App',
  description: 'This project is a Airbnb Clone',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <RegisterModal />
        <LoginModal />
        {/* <Modal isOpen /> */}
        <Navbar />
        {children}
      </body>
    </html>
  );
}
