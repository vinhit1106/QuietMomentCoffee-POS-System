import QuietMomentCoffeeLogo from "../../common/QuietMomentCoffeeLogo";
import NotificationMenu from "./NotificationMenu";
import { Badge } from "../../ui/badge";
import UserMenu from "./UserMenu";
import SearchOrder from "./SearchOrder";
import Link from "next/link";

const Header = () => {
  return (
    <header className="border-b px-4 py-2 md:px-6">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex flex-1 items-center gap-2">
          <div className="flex items-center">
            <Link href="/" className="text-primary hover:text-primary/90">
              <QuietMomentCoffeeLogo />
            </Link>
          </div>
        </div>
        {/* Middle area */}
        <div className="grow">
          {/* Search order form */}
          <SearchOrder />
        </div>
        {/* Right side */}
        <div className="flex flex-1 items-center justify-end gap-4">
          <Badge variant="outline" className="gap-1.5 text-emerald-600">
            <span
              className="size-1.5 rounded-full bg-emerald-500"
              aria-hidden="true"
            ></span>
            Online
          </Badge>
          {/* Notification */}
          <NotificationMenu />
          {/* User menu */}
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
