import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserDataTable } from "@/components/users/table/user-data-table";
import { columns } from "@/components/users/table/user-data-table-columns";
import { db } from "@/core/client/client";
import { language } from "@/resource/language/language";

const UserListPageStyles = {
  CARD: 'm-2',
  CARD_CONTENT: 'p-2 md:p-5 h-[80vh] overflow-y-auto',
};

const UserListPage = async () => {
  const data = await db.user.findMany();
  // console.log(data)
  return (
    <section>
      <Card className={UserListPageStyles.CARD}>
        <CardHeader>
          <CardTitle>{language.USER_MANAGEMENT}</CardTitle>
          <CardDescription>
           {language.USER_MANAGEMENT_DESC}
          </CardDescription>
        </CardHeader>
        <CardContent className={UserListPageStyles.CARD_CONTENT}>
          <UserDataTable data={data} columns={columns} />
        </CardContent>
      </Card>
    </section>
  );
};

export default UserListPage;
