import {
  Box,
  Button,
  CheckBox,
  Text,
  DataTable,
  Header,
  Toolbar,
  Layer,
  Form,
  FormField,
  TextInput,
} from "grommet";
import React, { useEffect } from "react";
import { Color } from "../../models/Color";
import { pickTextColorBasedOnBgColorAdvanced, capitalize } from "../../utils";
import { Edit, Trash } from "grommet-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  create,
  findByType,
  remove,
  update,
} from "../../services/color.service";

type ColorCrudProps = {
  type: "multiplier" | "tolerance";
};

const ColorCrud: React.FC<ColorCrudProps> = (props) => {
  const [showForm, setShowForm] = React.useState(false);
  const [formValue, setFormValue] = React.useState<Partial<Color>>({});
  const [selectedValue, setSelectedValue] = React.useState<Partial<Color>>({});

  const typeQuery = useQuery({
    queryKey: ["Color.findByType", props.type],
    queryFn: () => findByType(props.type),
  });

  const onSuccess = () => {
    typeQuery.refetch();
    setShowForm(false);
    setFormValue({});
  };
  const createMutation = useMutation({
    mutationKey: ["Color.create", props.type],
    mutationFn: () => create({ ...formValue, type: props.type }),
    onSuccess,
  });

  const updateMutation = useMutation({
    mutationKey: ["Color.update", props.type],
    mutationFn: ({ color }: { color: Partial<Color> }) =>
      update(color.id as number, color),
    onSuccess,
  });

  const removeMutation = useMutation({
    mutationKey: ["Color.remove", props.type],
    mutationFn: ({ id }: { id: number }) => remove(id as number),
    onSuccess,
  });

  useEffect(() => {
    if (selectedValue.id) {
      setShowForm(true);
      setFormValue(selectedValue);
    }
  }, [selectedValue]);

  return (
    <Box justify="start" gap="medium" style={{ paddingBottom: "30px" }}>
      <Toolbar>
        <Text weight="bold" size="30px">
          {capitalize(props.type)}
        </Text>
        <Box flex />
        <Button
          label="Create"
          primary
          onClick={() => {
            setSelectedValue({});
            setFormValue({ hex: "#000000", active: true });
            setShowForm(true);
          }}
        />
        {showForm && (
          <Layer style={{ width: "500px", padding: "20px" }}>
            <Form
              value={formValue}
              onChange={(nextValue) => setFormValue(nextValue)}
              onReset={() => {
                setFormValue({});
                setShowForm(false);
              }}
              onSubmit={({ value }) => {
                selectedValue.id
                  ? updateMutation.mutate({ color: value })
                  : createMutation.mutate();
              }}
            >
              <Header pad="small" width="100%">
                <Text weight="bold" size="25px">
                  {selectedValue.id ? "Edit" : "Create"}{" "}
                  {capitalize(props.type)}{" "}
                  {selectedValue.id && " ID: " + selectedValue.id}
                </Text>
              </Header>
              <FormField
                required
                name="name"
                htmlFor="text-input-id"
                label="Name"
              >
                <TextInput id="text-input-id" name="name" />
              </FormField>
              <FormField label="Color">
                <TextInput
                  onBlur={(e) =>
                    setFormValue((value) => ({
                      ...value,
                      hex: e.target.value,
                    }))
                  }
                  type="color"
                  style={{ height: "60px", width: "60px" }}
                  value={formValue.hex}
                />
              </FormField>
              <FormField
                required
                name="value"
                htmlFor="text-input-id"
                label="Value"
              >
                <TextInput id="text-input-id" name="value" type="number" />
              </FormField>
              <FormField name="active" htmlFor="text-input-id" label="Active">
                <CheckBox name="active" />
              </FormField>
              <Box direction="row" gap="small" style={{ marginTop: "30px" }}>
                <Button
                  label="Close"
                  type="reset"
                  style={{ marginLeft: "auto" }}
                />
                <Button type="submit" label="Submit" primary />
              </Box>
            </Form>
          </Layer>
        )}
      </Toolbar>
      <DataTable
        columns={[
          { property: "name", header: "Name" },
          {
            property: "hex",
            header: "Color",
            render: (data: Color) => (
              <Box
                pad="xsmall"
                style={{
                  backgroundColor: data.hex,
                  color: pickTextColorBasedOnBgColorAdvanced(
                    data.hex,
                    "white",
                    "black"
                  ),
                }}
              >
                {data.hex}
              </Box>
            ),
          },
          { property: "value", header: "Value" },
          {
            property: "active",
            header: "Active",
            render: (data: Color) => (
              <CheckBox
                checked={data.active}
                onClick={() =>
                  updateMutation.mutate({
                    color: { id: data.id, active: !data.active },
                  })
                }
              />
            ),
          },
          {
            property: "edit",
            header: "Edit",
            render: (data: Color) => (
              <Button
                icon={<Edit />}
                onClick={() => setSelectedValue({ ...data })}
              />
            ),
            size: "50px",
          },
          {
            property: "edit",
            header: "Delete",
            render: (data: Color) => (
              <Button
                icon={<Trash color="red" />}
                onClick={() => removeMutation.mutate({ id: data.id as number })}
              />
            ),
            size: "80px",
          },
        ]}
        data={typeQuery.data || []}
        sortable
        step={10}
        paginate
      />
    </Box>
  );
};
export default ColorCrud;
