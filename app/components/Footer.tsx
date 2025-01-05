export default function Footer() {
  return (
    <footer className="w-full py-12 bg-[#fcfcfc]">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="mt-8 text-center text-gray-600">
          © {new Date().getFullYear()} Louis-Émile Vromet. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
